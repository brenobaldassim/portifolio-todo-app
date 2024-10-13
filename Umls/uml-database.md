``` mermaid
erDiagram
    USER {
        INTEGER id PK
        VARCHAR username
        VARCHAR password
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    TASK {
        INTEGER id PK
        VARCHAR title
        TEXT description
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
        INTEGER user_id FK
    }

    USER ||--o{ TASK : "has"
```