var xmlDoc// an xml doc to be loaded
var xmlObj// our parsed xml obj
var xsltProcessor // our xsl stylesheet
var loadedArticle = []// store the artcle id and text

// SOURCE XML
var newsitems = {
  // loadedArticle.push();
  loadXML: function (xmlfile) {
    /* Get correct xmlHttp Obj */
    xmlDoc = new window.XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP') || new ActiveXObject('Msxml2.XMLHTTP')
    xmlDoc.onreadystatechange = function () {
      if (xmlDoc.readyState == 4 && xmlDoc.status == 200) {
        newsitems.renderList()
      }
    }
    xmlDoc.async = false
    xmlDoc.overrideMimeType('text/xml')
    xmlDoc.open('GET', xmlfile, false)
    xmlDoc.send(null)

    return xmlDoc.responseXML
  },
  // Create Navigation from XML list
  renderList: function () {
    xmlObj = xmlDoc.responseXML.documentElement

    if (xmlObj.hasChildNodes()) {
      var children = xmlObj.childNodes

      var root = xmlObj.getElementsByTagName('news')
      var id = xmlObj.getElementsByTagName('id')
      var title = xmlObj.getElementsByTagName('title')
      var desc = xmlObj.getElementsByTagName('shortText')

      var newslist = document.getElementById('newslist')

      var theDesc = []

      for (var i = 0; i < id.length; i++) {
        var container = document.createElement('li')
        container.setAttribute('title', title[i])
        container.setAttribute('id', id[i])

        theId = id[i].textContent
        theFile = title[i].textContent
        theTitle = desc[i].textContent
        theDesc.push(desc[i].firstChild.data)
        container.title = theFile
        container.id = theId
        container.textContent = theTitle
        newslist.appendChild(container)
      }

      var els = document.getElementsByTagName('li')

      for (var i = 0; i < els.length; i++) {
        els[i].addEventListener('click', displayArticle, false)
      };
    } else {
      console.log('0sterile')
    }
  }

}

// RESULT ARTICLE
var articles = {

  getArticleText: function (id, file, title) {
    loadedArticle.push(id)
    this.runTransform(title, file, id)
  },

  // XPATH
  runTransform: function (xmlUrl, title, id) {
    var xslUrl = 'poemas.xsl'

    if (document.implementation && document.implementation.createDocument) {
      // for Mozilla
      xsltProcessor = new XSLTProcessor()
      // load the xsl file
      var xsl = newsitems.loadXML(xslUrl)
      var xslStylesheet = xsl

      xsltProcessor.setParameter(null, 'id', id)
      xsltProcessor.importStylesheet(xslStylesheet)
      // load the xml file
      var xmlDoc = newsitems.loadXML(xmlUrl + '.xml')
      console.log(xmlDoc)
      // transform
      var resultDocument = xsltProcessor.transformToFragment(xmlDoc, document)

      document.querySelector('#result').innerHTML = ''
      document.querySelector('#result').appendChild(resultDocument)
    } else if (window.ActiveXObject) {
      // for IE
      xml = new ActiveXObject('MSXML2.DOMDocument')
      xml.async = false
      xml.addParameter('CATEGORY', id)
      xml.load(xmlUrl)

      // Load XSL
      xsl = new ActiveXObject('MSXML2.DOMDocument')
      xsl.async = false
      xsl.load(xslUrl)
      // Transform
      document.getElementById('result').innerHTML = xml.transformNode(xsl)
    } else {
        alert('XSLT not available...')
    }
  }

}

// EVENTS
function displayList () {
  newsitems.renderList()
}
function displayArticle (evt) {
  var evt = evt || window.event
  var id = evt.target.id
  var title = evt.target.title
  var file = evt.target.textContent

  articles.getArticleText(id, file, title)
  evt.preventDefault()
  evt.stopPropagation()
  // return false;
}

document.addEventListener('DOMContentLoaded', displayList, false)

newsitems.loadXML('list.xml')
