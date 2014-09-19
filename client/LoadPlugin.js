/*
* Copyright (c) 2012, CIRSFID and University Of Bologna (Department of computer science)
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the CIRSFID and University Of Bologna (Department of computer science)
*      nor the names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY CIRSFID and University Of Bologna (Department of computer science)
* ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL CIRSFID and University Of Bologna (Department of computer science)
* BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * This is the plugin for loading documents
 */

Ext.define('WAWE.ux.LoadPlugin', {
    singleton : true,
    alternateClassName : 'LoadPlugin',

    metadataClass : 'meta',
    authorialNoteClass : 'authorialNote',
    changePosAttr: 'chposid',
    changePosTargetAttr: 'chpos_id',
    refToAttribute: 'refto',

    supLinkTemplate : new Ext.Template('<sup><a class="linker" href="#">{markerNumber}</a></sup>'),

    beforeLoad : function(params) {
        var metaResults = [], extdom, documents;
        /*if (params.docDom) {
            extdom = new Ext.Element(params.docDom);
            documents = extdom.query("*[class~=" + DocProperties.documentBaseClass + "]");
            Ext.each(documents, function(doc, index) {
                metaResults.push(Ext.Object.merge(this.processMeta(doc), {docDom: doc}));
            }, this);
            
            this.processNotes(extdom);
            
            // Set the properties of main document which is the first docuemnt found
            if (metaResults[0]) {
                // params object contains properties inserted by user, 
                // metaResults contains properties founded in the document
                metaResults[0].docLang = metaResults[0].docLang || params.docLang;
                metaResults[0].docLocale = metaResults[0].docLocale || params.docLocale;
                metaResults[0].docType = metaResults[0].docType || params.docType;
                params.docLang = metaResults[0].docLang;
                params.docLocale = metaResults[0].docLocale;
                params.docType = metaResults[0].docType;
                params.metaDom = metaResults[0].metaDom;
            }
        }*/
        params.docLang = "ita";
        params.docLocale = "it";
        params.docType = "manuscriptDescription";
        return params;
    },

    afterLoad : function(params, app) {
        var editorDom = params.editorDom, metadataDom = params.metadataDom;

        
    },
    
    processMeta: function(doc) {
        var extdom = new Ext.Element(doc),
            meta = extdom.down("*[class=" + this.metadataClass + "]"),
            cls = doc.getAttribute("class").split(' '),
            result = {};
            
        result.docType = Ext.Array.difference(cls, [DocProperties.documentBaseClass])[0];
        if (meta && meta.dom.parentNode) {
            var language = meta.down("*[class=FRBRlanguage]", true),
                country = meta.down("*[class=FRBRcountry]", true);

            if (language) {
                result.docLang = language.getAttribute('language');
            }
            if (country) {
                result.docLocale = country.getAttribute('value');
            }
            result.metaDom = meta.dom.parentNode.removeChild(meta.dom);
        }
        return result;
    },
    
    processNotes : function(extdom) {
        var athNotes = extdom.query("*[class~=" + this.authorialNoteClass + "]"), 
            linkTemplate = this.supLinkTemplate,
            authCounter = 0;
            
        Ext.each(athNotes, function(element, index) {
            var parent = element.parentNode, 
                markerNumber = element.getAttribute('akn_marker'),
                elId = 'athNote_' + index,
                tmpElement,  link, tmpExtEl;

            while(!markerNumber) {
                var newMarker = 'note'+(++authCounter);
                if (extdom.query("*[akn_marker=" + newMarker + "]").length == 0) {
                    markerNumber =  newMarker;   
                }
            }
           tmpElement = Ext.DomHelper.createDom({
                tag : 'span',
                cls: 'posTmpSpan',
                html : linkTemplate.apply({
                    'markerNumber' : markerNumber
                })
            });
            tmpElement.querySelector('a').setAttribute(this.refToAttribute, elId);
            //TODO: move to constants
            tmpElement.setAttribute(this.changePosAttr, elId);
            element.setAttribute(this.changePosTargetAttr, elId);
            element = parent.replaceChild(tmpElement, element);
            // extEl.replace(tmpElement).insertAfter(parent);
            //TODO: imporve this
            if (parent.nextSibling) {
                parent.parentNode.insertBefore(element, parent.nextSibling);
            } else {
                parent.parentNode.appendChild(element);
            }
        }, this);
    }
});
