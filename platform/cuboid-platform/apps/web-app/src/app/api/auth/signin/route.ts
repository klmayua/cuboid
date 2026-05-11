import { NextResponse } from 'next/server';
import { signin } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const result = await signin(email, password);
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, error: { code: err.code, message: err.message } }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: { code: 'SIGNIN_FAILED', message: (err as Error).message } }, { status: 500 });
  }
}
