import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await prisma.service.findMany({
      include: { seller: { select: { id: true, name: true } }, reviews: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil layanan', error: err });
  }
};

export const getService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
      where: { id },
      include: { seller: { select: { id: true, name: true } }, reviews: true },
    });
    if (!service) {
      res.status(404).json({ message: 'Layanan tidak ditemukan' });
      return;
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil detail layanan', error: err });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, category, imageUrl } = req.body;
    const sellerId = (req as any).user?.id;
    if (!title || !description || !price || !category || !imageUrl) {
      res.status(400).json({ message: 'Semua field wajib diisi' });
      return;
    }
    const service = await prisma.service.create({
      data: { title, description, price: Number(price), category, imageUrl, sellerId },
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat layanan', error: err });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const sellerId = (req as any).user?.id;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      res.status(404).json({ message: 'Layanan tidak ditemukan' });
      return;
    }
    if (service.sellerId !== sellerId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    const { title, description, price, category, imageUrl } = req.body;
    const updated = await prisma.service.update({
      where: { id },
      data: { title, description, price: Number(price), category, imageUrl },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Gagal update layanan', error: err });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const sellerId = (req as any).user?.id;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      res.status(404).json({ message: 'Layanan tidak ditemukan' });
      return;
    }
    if (service.sellerId !== sellerId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    await prisma.service.delete({ where: { id } });
    res.json({ message: 'Layanan dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus layanan', error: err });
  }
}; 