<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" />

<xsl:param name="id" />

<xsl:template match="response">

<xsl:for-each select="newsList/news[id=$id]">
 <li>
   <h3><xsl:value-of select="text"/></h3>
   	
   </li>
   </xsl:for-each>


</xsl:template>
</xsl:stylesheet>