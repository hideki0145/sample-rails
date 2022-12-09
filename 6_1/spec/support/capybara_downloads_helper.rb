module CapybaraDownloadsHelper
  PATH = Rails.root.join('tmp/downloads')
  TIMEOUT = 10

  def self.path
    File.join(PATH, Thread.current.object_id.to_s)
  end

  def self.files
    Dir[File.join(path, '*')]
  end

  def self.downloaded?
    files.grep(/\.crdownload$/).none? && files.any?
  end

  def self.wait_for_download
    Timeout.timeout(TIMEOUT) { loop { break if downloaded? } }
  end

  def self.delete_all
    FileUtils.rm_f(files)
  end
end

RSpec.configure do |config|
  config.before(:all) do
    FileUtils.mkdir_p(CapybaraDownloadsHelper.path)
  end

  config.after(:all) do
    FileUtils.rm_rf(CapybaraDownloadsHelper.path)
  end

  config.before do
    CapybaraDownloadsHelper.delete_all
  end
end
