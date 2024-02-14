#!/bin/sh

cd www && npm ci
cp .env.example .env