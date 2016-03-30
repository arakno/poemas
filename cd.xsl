<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="versos">
 <html>
 <link href="poemas.css" rel="stylesheet" type="text/css" />
 <body>
<h1><xsl:value-of select="poema/titulo"/></h1>
<h3><xsl:value-of select="poema/autor"/></h3>
   <xsl:for-each select="poema/estrofe">
   <div id="quadra">
   <xsl:for-each select="verso">
   <xsl:value-of select="."/><br />
   </xsl:for-each>
   </div>
   </xsl:for-each>
   
 </body>
 </html>
</xsl:template></xsl:stylesheet> 
