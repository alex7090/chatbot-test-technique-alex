import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Route API pour recuperer les options, locations et items
 * Méthode: GET
 * @returns Liste des options, items et locations
 */
export async function GET() {
    try {
        const [options, items, locations] = await Promise.all([
            prisma.option.findMany(),
            prisma.item.findMany(),
            prisma.location.findMany(),
        ]);

        const data = {
            "options": options,
            "items": items,
            "locations": locations
        };
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);

        return NextResponse.json(
            { error: 'Erreur lors de la récupération des données' },
            { status: 500 }
        );
    }
} 