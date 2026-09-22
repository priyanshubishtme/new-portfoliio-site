---
title: Teaching a car to drive with SARSA
slug: teaching-car-to-drive
date: 2026-09-15
tag: Machine learning
readTime: 6
excerpt: "864 states, 5 actions and a lot of crashes: how a small Q-table learned to stay in its lane."
sample: true
---

Arena Self-Driving is a reinforcement learning simulator where an agent learns to drive on a highway using tabular SARSA. The state space is discretized into 864 states, the agent has 5 driving actions, and the Q-table has 4,320 entries. It's small enough to understand every cell, which is exactly the point.

The trick that made training work was warm-starting from human demonstrations. I recorded my own driving sessions and used those trajectories to initialize the Q-table, so the agent didn't start from pure randomness. It started from "decent" and learned its way to "good."

Training metrics stream to the browser in real time through FastAPI, so I can watch the policy improve live instead of guessing from a log file. Four metrics — reward, episode length, lane deviation, and collision rate — tell the whole story of whether the agent is learning or just crashing in new ways.
