require "sinatra/base"
require "sass/plugin/rack"

class App < Sinatra::Base

  configure do
    use Sass::Plugin::Rack
    Sass::Plugin.options[:style] = :compressed
  end

  get "/" do
    File.read(File.join("public", "index.html"))
  end

end
