namespace :maintenance do
  desc 'メンテナンスモードをONする'
  task on: :environment do
    FileUtils.touch(Rails.public_path.join('maintenance'))
  end

  desc 'メンテナンスモードをOFFする'
  task off: :environment do
    FileUtils.rm_f(Rails.public_path.join('maintenance'))
  end
end
