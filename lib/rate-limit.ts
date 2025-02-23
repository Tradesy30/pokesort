import { NextResponse } from 'next/server';

interface RateLimitContext {
  ip: string;
  route: string;
}

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function getRateLimitConfig() {
  return {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  };
}

export function isRateLimited(context: RateLimitContext) {
  const { max, windowMs } = getRateLimitConfig();
  const key = `${context.ip}-${context.route}`;
  const now = Date.now();

  const rateLimitInfo = rateLimit.get(key);

  // Reset rate limit if window has passed
  if (rateLimitInfo && now > rateLimitInfo.resetTime) {
    rateLimit.delete(key);
  }

  // Initialize or increment rate limit counter
  if (!rateLimit.has(key)) {
    rateLimit.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  const currentLimit = rateLimit.get(key)!;
  currentLimit.count += 1;

  if (currentLimit.count > max) {
    return true;
  }

  return false;
}

export function getRateLimitResponse() {
  const { windowMs } = getRateLimitConfig();

  return new NextResponse(
    JSON.stringify({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.',
      retryAfter: Math.ceil(windowMs / 1000),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil(windowMs / 1000)),
      },
    }
  );
}