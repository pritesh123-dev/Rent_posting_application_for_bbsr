package com.rentapp.bbsr.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Simple per-IP rate limiter — token bucket reset each minute.
 * For production, replace with Redis-backed limiter (e.g. Bucket4j).
 */
@Component
public class RateLimitFilter implements Filter {

    @Value("${app.ratelimit.requests-per-minute:60}")
    private int limit;

    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest http = (HttpServletRequest) req;
        String ip = http.getRemoteAddr();
        long nowMin = Instant.now().getEpochSecond() / 60;

        Window w = windows.compute(ip, (k, v) -> {
            if (v == null || v.minute != nowMin) return new Window(nowMin);
            return v;
        });

        if (w.count.incrementAndGet() > limit) {
            HttpServletResponse r = (HttpServletResponse) res;
            r.setStatus(429);
            r.getWriter().write("{\"success\":false,\"message\":\"Rate limit exceeded\"}");
            r.setContentType("application/json");
            return;
        }
        chain.doFilter(req, res);
    }

    private static class Window {
        final long minute;
        final AtomicInteger count = new AtomicInteger();
        Window(long m) { this.minute = m; }
    }
}
