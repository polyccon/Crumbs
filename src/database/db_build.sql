BEGIN;

    DROP TABLE IF EXISTS biscuits CASCADE;

    CREATE TABLE biscuits (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        chocolate BOOLEAN NOT NULL,
        calories INTEGER
    );

    INSERT INTO biscuits (name, brand, chocolate, calories) VALUES
    ('digestive', 'mcvities', FALSE, 100),
    ('oreo', 'unknown', TRUE, 300),
    ('imaginery', 'james', TRUE, NULL);


    DROP TABLE IF EXISTS feedback CASCADE;

    CREATE TABLE feedback (
        id SERIAL PRIMARY KEY,
        rating INTEGER NOT NULL,
        review TEXT,
        biscuit_id INTEGER REFERENCES biscuits(id)
    );

    INSERT INTO feedback (rating, review, biscuit_id) VALUES
    (3, 'best biscuit in the world', (SELECT id FROM biscuits WHERE name = 'oreo'));

COMMIT;
