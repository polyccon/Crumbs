BEGIN;

    DROP TABLE IF EXISTS biscuits CASCADE;

    CREATE TABLE biscuits (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        chocolate BOOLEAN NOT NULL,
        calories INTEGER
    );

    DROP TABLE IF EXISTS feedback CASCADE;

    CREATE TABLE feedback (
        id SERIAL PRIMARY KEY,
        rating INTEGER NOT NULL,
        review TEXT,
        biscuit_id INTEGER REFERENCES biscuits(id)
    );

COMMIT;
    
