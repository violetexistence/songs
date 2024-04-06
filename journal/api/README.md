# Journal API

## Getting Started
The first time:
```bash
bun install && bun dev
```

Next time:
```bash
bun start
```

## Unit Testing
To run unit tests:
```bash
bun test
```

## Database
Customize location of database in:
```bash
echo "DB_URL=journal.db\nAPI_PORT=3000" >> ./.env
```

Generate change scripts based on the latest schema:
```bash
bun generate
```

Update or create the database:
```bash
bun migrate
```

Browse the database using drizzle studio:
```bash
bun studio
```