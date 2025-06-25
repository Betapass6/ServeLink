import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingId, rating, comment } = req.body;
    const userId = (req as any).user?.id;
    if (!bookingId || !rating) {
      res.status(400).json({ message: 'bookingId & rating wajib diisi' });
      return;
    }
    // Cek booking valid dan sudah completed
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { review: true } });
    if (!booking) {
      res.status(404).json({ message: 'Booking tidak ditemukan' });
      return;
    }
    if (booking.buyerId !== userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    if (booking.status !== 'COMPLETED') {
      res.status(400).json({ message: 'Booking belum selesai' });
      return;
    }
    if (booking.review) {
      res.status(400).json({ message: 'Sudah ada review' });
      return;
    }
    const review = await prisma.review.create({
      data: {
        bookingId,
        rating: Number(rating),
        comment,
        serviceId: booking.serviceId,
      },
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat review', error: err });
  }
};

export const listReviewsByService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reviews = await prisma.review.findMany({
      where: { serviceId: id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil review', error: err });
  }
}; 