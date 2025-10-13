-- USERS TABLE: stores auth + profile info
CREATE TABLE devlinks_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,                      -- hashed password
  first_name VARCHAR(100),                      -- display first name
  last_name VARCHAR(100),                      -- display last name
  slug VARCHAR(100) UNIQUE NOT NULL,
  avatar_url TEXT,                             -- profile image URL
  token_version INT DEFAULT 0,                 -- for JWT invalidation
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LINKS TABLE: user-submitted links
CREATE TABLE devlinks_links (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES devlinks_users(id) ON DELETE CASCADE,
  platform VARCHAR(100) NOT NULL,              -- e.g., GitHub, LinkedIn
  url TEXT NOT NULL,                           -- full URL
  position INTEGER DEFAULT 0,                  -- optional ordering
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
