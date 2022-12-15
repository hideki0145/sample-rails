RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, js: true, type: :system) do
    driven_by :selenium, using: :headless_chrome, screen_size: [1440, 900]
    page.driver.browser.download_path = CapybaraDownloadsHelper.path
  end
end
