DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT DEFAULT NULL,
  profile_picture VARCHAR(255) DEFAULT NULL,
  website VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, username, password_hash, bio, website, profile_picture) VALUES
  ('admin@example.com', 'admin', '$2b$10$ZLw7fJpVWw9zACa9vhWOm.lBeFi/clZ.pltSAIyVZJi6rbecE9gTa', 'Administrateur du site', 'www.example.com', NULL),
  ('sophie@example.com', 'sophie', '$2b$10$ZLw7fJpVWw9zACa9vhWOm.lBeFi/clZ.pltSAIyVZJi6rbecE9gTa', 'Photographe passionnée', 'www.sophie-photo.com', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'),
  ('lucas@example.com', 'lucas', '$2b$10$ZLw7fJpVWw9zACa9vhWOm.lBeFi/clZ.pltSAIyVZJi6rbecE9gTa', 'Développeur web full-stack', 'www.lucas-dev.net', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'),
  ('emma@example.com', 'emma', '$2b$10$ZLw7fJpVWw9zACa9vhWOm.lBeFi/clZ.pltSAIyVZJi6rbecE9gTa', 'Blogueuse voyage', 'www.emma-travels.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb');

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO posts (user_id, content, created_at) VALUES
  -- Posts de Sophie (user_id = 2)
  (2, 'Nouveau shooting photo dans les rues de Paris. Les couleurs d''automne sont magnifiques !', '2024-03-10 14:30:00'),
  (2, 'Astuces pour la photographie en basse lumière : ISO, vitesse et ouverture.', '2024-03-11 09:15:00'),
  (2, 'Workshop photo prévu le mois prochain. Qui est intéressé ?', '2024-03-12 16:45:00'),
  
  -- Posts de Lucas (user_id = 3)
  (3, 'Je viens de terminer mon dernier projet React. Le code est disponible sur GitHub !', '2024-03-09 11:20:00'),
  (3, 'Les nouveautés de TypeScript 5.0 sont impressionnantes.', '2024-03-10 13:40:00'),
  (3, 'Tutorial : Comment optimiser vos requêtes SQL pour de meilleures performances.', '2024-03-11 15:55:00'),
  
  -- Posts d'Emma (user_id = 4)
  (4, 'Découverte des marchés traditionnels de Bangkok. Une explosion de saveurs !', '2024-03-08 08:25:00'),
  (4, 'Guide des meilleurs spots pour digital nomades à Bali.', '2024-03-09 10:30:00'),
  (4, 'Comment voyager léger : mes astuces après 2 ans sur la route.', '2024-03-10 12:15:00');

