import { Request, Response } from 'express';
import { PrismaClient, BookingStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { serviceId, date, note } = req.body;
    const buyerId = (req as any).user?.id;
    if (!serviceId || !date) {
      res.status(400).json({ message: 'serviceId & date wajib diisi' });
      return;
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date: new Date(date),
        note,
        buyerId,
        status: BookingStatus.PENDING,
      },
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Gagal booking', error: err });
  }
};

export const listBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    let bookings: any[] = [];
    if (user.role === 'BUYER') {
      bookings = await prisma.booking.findMany({
        where: { buyerId: user.id },
        include: { service: true },
        orderBy: { date: 'desc' },
      });
    } else if (user.role === 'SELLER') {
      bookings = await prisma.booking.findMany({
        where: { service: { sellerId: user.id } },
        include: { service: true, buyer: true },
        orderBy: { date: 'desc' },
      });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil booking', error: err });
  }
};

export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = (req as any).user;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { service: true },
    });
    if (!booking) {
      res.status(404).json({ message: 'Booking tidak ditemukan' });
      return;
    }
    if (user.role !== 'SELLER' || booking.service.sellerId !== user.id) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    if (!['ACCEPTED', 'DECLINED', 'COMPLETED'].includes(status)) {
      res.status(400).json({ message: 'Status tidak valid' });
      return;
    }
    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Gagal update status booking', error: err });
  }
}; 