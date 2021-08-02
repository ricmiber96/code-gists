import './style.css'
import Split from 'split-grid'
import { encode, decode } from 'js-base64'

const $html = document.querySelector('#html')
const $css = document.querySelector('#css')
const $js = document.querySelector('#js')
const $iframe = document.querySelector("#iframe")


$html.addEventListener('input',update)
$css.addEventListener('input',update)
$js.addEventListener('input',update)


Split({
	columnGutters: [{
    track: 1,
    element: document.querySelector('.vertical-gutter'),
  }],
  rowGutters: [{
  	track: 1,
    element: document.querySelector('.horizontal-gutter'),
  }]
})


function init() {

  //Cogemos la URL y la decodificamos en Base64
  const {pathname} = window.location
  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')

  const html = decode(rawHtml)
  const css = decode(rawCss)
  const js = decode(rawJs)

  $html.value = html
  $css.value = css
  $js.value = js

  const htmlFromUrl = createHtml(html,css,js)
  $iframe.setAttribute('srcdoc',htmlFromUrl)
}


function update(){

  var htmlValue = $html.value
  var css = $css.value
  var js = $js.value

  //Pasamos el codigo a Base64 y lo añadimos a la URL
  const hashedCode = `${encode(htmlValue)}|${encode(css)}|${encode(js)}`
  window.history.replaceState(null,null,`/${hashedCode}`)

  const html = createHtml(htmlValue,css,js)
  $iframe.setAttribute('srcdoc',html)
}

function createHtml(htmlValue,css,js){


  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${css}
      </style>
    </head>
    <body>
      ${htmlValue}
      <script>
      ${js}
    </script>
    </body>
    </html>`
}



init()