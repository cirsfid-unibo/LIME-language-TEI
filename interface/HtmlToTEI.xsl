<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="1.0">
    <xsl:output method="xml" indent="yes" encoding="UTF-8" />
    
    <xsl:template match="/">
    	<TEI>
    		<teiHeader>
    			<sourceDesc>
    				<msDesc>
        				<xsl:apply-templates />
					</msDesc>
				</sourceDesc>
			</teiHeader>
		</TEI>
    </xsl:template>
    
    <xsl:template match="   div | 
                            span | 
                            p">
        <xsl:variable name="aknName">
            <xsl:if test="substring-after(./@class,' ') != ''">
                <xsl:value-of select="translate(substring-after(./@class,' '),'_','')" />
            </xsl:if>
            <xsl:if test="substring-after(./@class,' ') = ''">
                <xsl:value-of select="translate(@class,'_','')" />
            </xsl:if>
            <xsl:if test="./@class = ''">
            	<xsl:value-of select="name(.)" />
            </xsl:if>
        </xsl:variable>
        <xsl:choose>
        	<xsl:when test="$aknName != ''">
		        <xsl:element name="{$aknName}">
		        	<xsl:for-each select="@*">
		        		<xsl:if test="substring-before(name(.),'_') = 'akn'">
		        			<xsl:attribute name="{substring-after(name(.),'_')}"><xsl:value-of select="." /></xsl:attribute>
		        		</xsl:if>	
		        	</xsl:for-each>
		       		<xsl:apply-templates />
       			</xsl:element>
        	</xsl:when>
        	<xsl:otherwise>
        	   <xsl:element name="{name(.)}">
		       		<xsl:apply-templates />
       			</xsl:element>
        	</xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="*">
        <xsl:element name="{name(.)}">
        	<xsl:for-each select="@*">
		    	<xsl:if test="substring-before(name(.),'_') = 'akn'">
		        	<xsl:attribute name="{substring-after(name(.),'_')}"><xsl:value-of select="." /></xsl:attribute>
		        </xsl:if>	
		    </xsl:for-each>
            <xsl:apply-templates />
        </xsl:element>
    </xsl:template>
    
    <!-- HTML elements -->
    <xsl:template match="br">
    	<eol />
    </xsl:template>

    <xsl:template match="strong">
		<xsl:element name="b">
        	<xsl:for-each select="@*">
		    	<xsl:if test="substring-before(name(.),'_') = 'akn'">
		        	<xsl:attribute name="{substring-after(name(.),'_')}"><xsl:value-of select="." /></xsl:attribute>
		        </xsl:if>	
		    </xsl:for-each>
    		<xsl:apply-templates />
    	</xsl:element>
    </xsl:template>

    <xsl:template match="p">
		<xsl:element name="{name(.)}">
        	<xsl:for-each select="@*">
		    	<xsl:if test="substring-before(name(.),'_') = 'akn'">
		        	<xsl:attribute name="{substring-after(name(.),'_')}"><xsl:value-of select="." /></xsl:attribute>
		        </xsl:if>	
		    </xsl:for-each>
    		<xsl:apply-templates />
    	</xsl:element>
    </xsl:template>
    
    <!-- Elements to ignore -->
    <xsl:template match="   div[contains(@class,'akoma_ntoso')] | 
                            p[contains(@class, 'breaking')] |
                            span[contains(@class, 'breaking')] |
                            div[contains(@class, 'toMarkNode')] |
                            p[contains(../@class, 'hcontainer') and not(contains(../@class, 'item'))] |
                            div[contains(@class,'notesContainer')] |
                            span[not(@*)]">
        <xsl:apply-templates />
    </xsl:template>
    
    <xsl:template match="text()">
        <xsl:value-of select="normalize-space(.)"/>
    </xsl:template>
</xsl:stylesheet>
