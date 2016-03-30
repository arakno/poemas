<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="versos">
 <html>
 <link href="css/poemas.css" rel="stylesheet" type="text/css" />
 <body>
<h3><xsl:value-of select="poema/titulo"/></h3>
   <xsl:for-each select="poema/estrofe">
   <div class="quadra">
   <xsl:for-each select="verso">
   <xsl:value-of select="."/><br />
   </xsl:for-each>
   </div>
   </xsl:for-each>
   <br />
   <footer class="poemfooter">
    <h5><xsl:value-of select="poema/autor"/></h5>
    <h6><xsl:value-of select="poema/@data"/></h6>
   </footer>
 </body>
 </html>
</xsl:template>
</xsl:stylesheet> 
