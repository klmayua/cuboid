import { NextResponse } from 'next/server';
import { signup, signin } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await signup(body);
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, error: { code: err.code, message: err.message } }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: { code: 'SIGNUP_FAILED', message: (err as Error).message } }, { status: 500 });
  }
}
