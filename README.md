URL Shortener API

A scalable backend URL shortener built with Node.js, Express, PostgreSQL (Neon), Redis (Upstash), and deployed on Render.
It includes caching, analytics tracking, and rate limiting to simulate production-grade backend behavior.

 Features
Convert long URLs into short codes
 Redis caching for fast redirects (cache-aside pattern)
 Click analytics tracking per short link
 Rate limiting middleware to prevent abuse
 RESTful API architecture
 Cloud-ready deployment (Render + Neon + Upstash)
 Tech Stack
Node.js
Express.js
PostgreSQL (Neon Serverless DB)
Redis (Upstash)
Render (Deployment)
