---
title: "Building AshaPure: 18 routes, 25 endpoints"
slug: building-ashapure
date: 2026-09-12
tag: Build log
readTime: 7
excerpt: How a MERN dairy platform came together, and what I would do differently next time.
sample: true
---

AshaPure started as a straightforward idea: a smart milk delivery platform. But "straightforward" disappeared fast. An order touches inventory. A subscription touches billing. A reward touches both. Making all of those systems agree without breaking each other was the real engineering challenge.

I built 18 frontend routes and 25 REST API endpoints, with JWT authentication and role-based access control. I tested the responsive layout across four viewport sizes and verified the production build with API smoke tests. Every piece had to work together.

The hardest lesson was about consistency — not in code style, but in data flow. When you own the full stack, every shortcut you take on the backend shows up as a bug on the frontend. I would do some things differently next time, but the experience of owning a project end to end was worth every late night.
