class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  private

  def attach_files(files)
    files.each do |file|
      attachments[file.original_filename] = {
        content: File.read(file.file.current_path, mode: 'rb'),
        transfer_encoding: :binary
      }
    end
  end
end
