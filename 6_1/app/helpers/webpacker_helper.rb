module WebpackerHelper
  def javascript_path(file_name)
    "views/#{controller_path}/#{file_name}"
  end
end
