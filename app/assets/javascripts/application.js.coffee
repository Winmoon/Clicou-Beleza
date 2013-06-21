# This is a manifest file that'll be compiled into application.js, which will include all the files
# listed below.
#
# Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
# or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
#
# It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
# the compiled file.
#
# WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
# GO AFTER THE REQUIRES BELOW.
#
#= require jquery
#= require jquery_ujs
#= require util/bootstrap.min
#= require util/base64

url = (url) ->
  root_url + url
make_base_auth = (user, password) ->
  tok = user + ":" + password
  hash = $.base64.encode(tok)
  "Basic " + hash

sign_in = ->
  $.post url("users/sign_in.json"),
    user:
      remember_me: 1
      email: "diegomr86@gmail.com"
      password: "smurfies"
  , (data) ->
    console.log data

sign_up = ->
  $.post url("users.json"),
    user:
      user_type: 'user'
      venue: ''
      name: 'teste'
      email: "diegomr865@gmail.com"
      password: "smurfies"
      password_confirmation: "smurfies"
      remember_me: 1
  , (data) ->
    console.log data

sign_up = ->
  $.post url("users.json"),
    post:
      user_type: 'user'
      venue: ''
      name: 'teste'
      email: "diegomr865@gmail.com"
      password: "smurfies"
      password_confirmation: "smurfies"
      remember_me: 1
  , (data) ->
    console.log data


root_url = "http://localhost:3000/"
$ ->
  $.ajaxSetup
    dataType: "json"
    crossDomain: true
    xhrFields:
      withCredentials: true

    beforeSend: (req) ->
      req.setRequestHeader "Authorization", make_base_auth("clicoubeleza", "uyP4RnNMGe4coOm6kIcfAt9E1S8AHK9wwHqPZO9xz7I")
    statusCode:
      401: ->
        alert "Fazer login"
      400: (error) ->
        alert "Não passou na validação: "+ error.responseText
      422: (error) ->
        alert "Não passou na validação: "+ error.responseText

  sign_in()
  # sign_up()
  # create_post()