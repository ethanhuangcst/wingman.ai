-- Add deepseek3.2 provider to ai_providers table
INSERT INTO ai_providers (id, name, base_urls, default_model, requires_auth, auth_header)
VALUES
  ('deepseek3.2', 'deepseek3.2', '["https://api.deepseek.com/v1"]', 'deepseek3.2', TRUE, 'Authorization')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  base_urls = VALUES(base_urls),
  default_model = VALUES(default_model),
  requires_auth = VALUES(requires_auth),
  auth_header = VALUES(auth_header),
  updated_at = CURRENT_TIMESTAMP;

-- Verify the provider was added
SELECT * FROM ai_providers WHERE id = 'deepseek3.2';

-- List all providers to confirm
SELECT id, name, default_model FROM ai_providers ORDER BY created_at ASC;
