begin
  require 'rbs_rails/rake_task'
rescue LoadError
  return
end

RbsRails::RakeTask.new do |task|
  # If you want to avoid generating RBS for some classes, comment in it.
  # default: nil
  #
  # task.ignore_model_if = -> (klass) { klass == MyClass }

  # If you want to change the rake task namespace, comment in it.
  # default: :rbs_rails
  # task.name = :cool_rbs_rails

  # If you want to change where RBS Rails writes RBSs into, comment in it.
  # default: Rails.root / 'sig/rbs_rails'
  # task.signature_root_dir = Rails.root / 'my_sig/rbs_rails'
end

namespace :rbs do
  task setup: ['rbs:collection:install', 'rbs_rails:all', :auto_completion]

  namespace :collection do
    task install: :environment do
      system('bundle exec rbs collection install')
    end

    task update: :environment do
      system('bundle exec rbs collection update')
    end
  end

  task auto_completion: :environment do
    auto_path = Rails.root.join('sig/auto_completion')
    patch_path = Rails.root.join('sig/patch')
    FileUtils.rm_rf(auto_path)

    Dir['app/models/**/*.rb', 'app/lib/**/*.rb'].each do |src_path|
      next if File.exist?("#{patch_path}/#{src_path}s")

      dest_dir = "#{auto_path}/#{File.dirname(src_path)}"
      FileUtils.mkpath(dest_dir)
      dest_path = "#{auto_path}/#{src_path}s"
      system("rbs prototype rb #{src_path} > #{dest_path}")
      print '.'
    end
  end
end
