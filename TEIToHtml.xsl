<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="1.0">
    <xsl:output method="xml" indent="yes" encoding="UTF-8" />
    
    <xsl:template match="/">
		<xsl:apply-templates />
    </xsl:template>
    
    <!-- ATTRIBUTE'S GENERIC TEMPLATE -->
	<xsl:template mode="elementAttributes" match="@*" >
    	<xsl:choose> 
    		<xsl:when test="not(starts-with(name(.),'xml'))">
    			<xsl:variable name="attName" select="concat('akn_',name(.))"/>
    			<xsl:attribute name="{$attName}">
    				<xsl:value-of select="." />
    			</xsl:attribute>	
    		</xsl:when>
    		<xsl:otherwise>
    			<xsl:attribute name="{name(.)}">
    				<xsl:value-of select="." />
    			</xsl:attribute>	
    		</xsl:otherwise>
    	</xsl:choose>	
    </xsl:template>
    
    	<!-- UNDEFINED ATTRIBUTE'S GENERIC TEMPLATE -->
	<xsl:template mode="undefinedElementAttributes" match="@*" >
			<xsl:attribute name="{name(.)}">
				<xsl:value-of select="." />
			</xsl:attribute>	
	</xsl:template>
    
    <xsl:template match="teiHeader |
						 sourceDesc |
						 msDesc |
						 manuscriptDescription">
		<xsl:apply-templates />	
	</xsl:template>
    
    <xsl:template match="fileDesc">
		<div>	
			<xsl:attribute name="class">
				<xsl:value-of select="name(.)" />
			 </xsl:attribute>
			<!-- ATTRIBUTE'S GENERIC TEMPLATE -->
			<xsl:apply-templates select="@*" mode="elementAttributes" />
			<xsl:apply-templates/>
		</div>   	
	</xsl:template>
	
	<xsl:template match="titleStmt |
						 publicationStmt |
						 msIdentifier |
						 head |
						 msContents |
						 msItem |
						 note |
						 physDesc |
						 objectDesc |
						 supportDesc |
						 decoDesc |
						 decoNote |
						 bindingDesc |
						 binding |
						 history |
						 origin |
						 provenance |
						 additional |
						 adminInfo |
						 recordHist |
						 source |
						 listBibl |
						 bibl">
		<div>	
			<xsl:attribute name="class">
				<xsl:value-of select="concat('container ',name(.))" />
			 </xsl:attribute>
			 <xsl:attribute name="internalid">
				<xsl:value-of select="name(.)" />
			 </xsl:attribute>
			<!-- ATTRIBUTE'S GENERIC TEMPLATE -->
			<xsl:apply-templates select="@*" mode="elementAttributes" />
			<xsl:apply-templates/>
		</div>   	
	</xsl:template>
	
	<xsl:template match="ref |
						 biblScope |
						 pubPlace |
						 author |
						 name |
						 condition |
						 width |
						 height |
						 dimensions |
						 extent |
						 support |
						 term |
						 explicit |
						 incipit |
						 rubric |
						 date |
						 textLang |
						 locus |
						 origDate |
						 origPlace |
						 title |
						 idno |
						 repository |
						 settlement |
						 country">
		<div>	
			<xsl:attribute name="class">
				<xsl:value-of select="concat('inline ',name(.))" />
			 </xsl:attribute>
			 <xsl:attribute name="internalid">
				<xsl:value-of select="name(.)" />
			 </xsl:attribute>
			<!-- ATTRIBUTE'S GENERIC TEMPLATE -->
			<xsl:apply-templates select="@*" mode="elementAttributes" />
			<xsl:apply-templates/>
		</div>   	
	</xsl:template>
	
	
	<!-- Html elements -->
	<xsl:template match="p |
						span |
						a |
						b |
						i|
						u |
						sub |
						sup |
						abbr |
						br |
						div |
						img |
						li |
						ol |
						ul |
						table |
						td |
						th |
						caption |
						tr">
	        <xsl:element name="{name(.)}">
	        	<!-- TODO: check the specific HTML elements attributes -->
	        	
	        	<!-- ATTRIBUTE'S GENERIC TEMPLATE -->
	        	<xsl:apply-templates select="@*" mode="undefinedElementAttributes" />
	    
	        	<xsl:apply-templates />
    	</xsl:element>
	</xsl:template>
    
    
    <!-- Elements to ignore -->
    <xsl:template match="   div[contains(@class,'akoma_ntoso')] | 
                            p[contains(../@class, 'hcontainer')]">
        <xsl:apply-templates />
    </xsl:template>
    
    <xsl:template match="text()">
        <xsl:value-of select="normalize-space(.)"/>
    </xsl:template>
</xsl:stylesheet>
