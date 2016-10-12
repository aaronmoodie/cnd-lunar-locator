require "sinatra/base"
require "sass/plugin/rack"
require "net/http"
require "json"

class App < Sinatra::Base

  configure do
    use Sass::Plugin::Rack
    Sass::Plugin.options[:style] = :compressed
  end

  helpers do
    # loop through vehicles and
    # combine JSON in to single response
    def get_json
      array = []
      for i in 0..5
        url = "http://cndlunarlocator.herokuapp.com/vehicles/#{i}/locate.json"
        uri = URI(url)
        response = Net::HTTP.get(uri)
        array.push(JSON.parse(response))
      end
      return array.to_json
    end
  end

  get "/" do
    File.read(File.join("public", "index.html"))
  end

  get "/api/vehicles.json" do
    content_type :json
    get_json
  end

end
