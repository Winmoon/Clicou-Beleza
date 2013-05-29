Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '163039620543757', '9b2d0b99a89eb610b75ba029c8ac7613'
end