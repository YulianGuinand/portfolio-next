import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-revalidation-token') || request.nextUrl.searchParams.get('secret');

    if (secret !== process.env.REVALIDATION_TOKEN && secret !== 'secret-revalidation-token') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { model, entry } = body;

    // Revalider le tag général et le tag spécifique
    revalidateTag('strapi');

    if (model === 'project') {
      revalidateTag('projects');
      revalidatePath('/work');
      revalidatePath('/projects');
      revalidatePath('/sitemap.xml');
      if (entry?.slug) {
        revalidateTag(`project-${entry.slug}`);
        revalidatePath(`/work/${entry.slug}`);
      }
    } else if (model === 'document') {
      revalidateTag('documents');
      revalidatePath('/documents');
    } else if (model === 'photo') {
      revalidateTag('photos');
      revalidatePath('/photos');
    } else if (model === 'global') {
      revalidateTag('global');
      revalidatePath('/');
    } else {
      // Revalidation globale par sécurité
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      model,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ message: 'Error revalidating', error: message }, { status: 500 });
  }
}
