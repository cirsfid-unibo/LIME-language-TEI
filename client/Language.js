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
 * Language dependent utilities
 */
Ext.define('WAWE.ux.Language', {
    /* Since this is merely a utility class define it as a singleton (static members by default) */
    singleton : true,
    alternateClassName : 'Language',
    
    name: 'TEI',
    
    /**
     * Translate the content based on an external web service (called by 
     * an ajax request) which uses a XSLT stylesheet.
     * If the ajax request is successful the success callback is called.
     * Note that this function doesn't return anything since it asynchronously
     * call callback functions.
     * 
     * @param {String} content The content to translate
     * @param {Object} callbacks Functions to call after translating 
     */
    translateContent : function(content, markingLanguage, callbacks) {
        var params = {
            requestedService : Statics.services.xsltTrasform,
            output : 'tei',
            input : content,
            markingLanguage : markingLanguage
        }, transformFile = Config.getLanguageTransformationFile("LIMEtoLanguage");
        if (transformFile) {
            params = Ext.merge(params, {
                transformFile : transformFile
            });
        }
        //Calling the translate service
        Ext.Ajax.request({
            // the url of the web service
            url : Utilities.getAjaxUrl(),
            method : 'POST',
            // send the content in XML format
            params : params,
            scope : this,
            // if the translation was performed
            success : function(result, request) {
                if (Ext.isFunction(callbacks.success)) {
                    callbacks.success(result.responseText);
                }
            },
            failure : callbacks.failure
        });
    },
    getLanguageMarkingId: function() {
    	return "";
    }
    
});