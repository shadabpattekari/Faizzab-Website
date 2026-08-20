-- FaizZab corporate website schema for Hostinger MySQL
-- Apply with: npm run db:schema (requires MYSQL_* env vars)

CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(191) NOT NULL,
  role ENUM('super_admin', 'content_editor') NOT NULL DEFAULT 'content_editor',
  password_hash VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  failed_attempts INT NOT NULL DEFAULT 0,
  locked_until DATETIME NULL,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  INDEX idx_admin_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_id INT UNSIGNED NULL,
  action VARCHAR(191) NOT NULL,
  entity_type VARCHAR(100) NULL,
  entity_id VARCHAR(100) NULL,
  details TEXT NULL,
  ip_address VARCHAR(64) NULL,
  created_at DATETIME NOT NULL,
  INDEX idx_audit_admin (admin_id),
  INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS website_leads (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  organization VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  phone VARCHAR(64) NULL,
  service_interest VARCHAR(191) NOT NULL,
  message TEXT NOT NULL,
  consent TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('New', 'Contacted', 'Qualified', 'Closed', 'Spam') NOT NULL DEFAULT 'New',
  source VARCHAR(100) NOT NULL DEFAULT 'contact_form',
  created_at DATETIME NOT NULL,
  INDEX idx_leads_status (status),
  INDEX idx_leads_created (created_at),
  INDEX idx_leads_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_at DATETIME NULL,
  updated_by INT UNSIGNED NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_services (
  slug VARCHAR(100) PRIMARY KEY,
  payload JSON NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  updated_at DATETIME NULL,
  updated_by INT UNSIGNED NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_insights (
  slug VARCHAR(191) PRIMARY KEY,
  payload JSON NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  updated_at DATETIME NULL,
  updated_by INT UNSIGNED NULL,
  INDEX idx_insights_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_resources (
  slug VARCHAR(191) PRIMARY KEY,
  payload JSON NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  updated_at DATETIME NULL,
  updated_by INT UNSIGNED NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_faqs (
  slug VARCHAR(100) PRIMARY KEY,
  payload JSON NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  updated_at DATETIME NULL,
  updated_by INT UNSIGNED NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_seo (
  path_key VARCHAR(191) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  meta_description VARCHAR(320) NOT NULL,
  updated_at DATETIME NULL,
  updated_by INT UNSIGNED NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
