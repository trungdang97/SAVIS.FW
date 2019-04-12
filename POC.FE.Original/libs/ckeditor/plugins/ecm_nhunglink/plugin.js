
/* @license Copyright (c) 2015-2016, SAVIS Vietnam Corporation. All rights reserved.
* SAVIS ECM Editor's Plugin
* Plugin : File Manager / Assert Manager
* Author : TruongND
* 25 Mar 2016
*/
(function(angular) {
    CKEDITOR.plugins.add( 'ecm_nhunglink', {
        icons: 'ecm_nhunglink',
        init: function( editor ) {
            editor.addCommand( 'ecmNhungLink', {
                exec: function(editor) {
                    var selection = editor.getSelection();

                    // Parse the editor to next popup
                    var data = editor.ecm.nhungLink(editor, selection);
                }
            });
            editor.ui.addButton('ecm_nhunglink', {
                label: 'Embed links',
                command: 'ecmNhungLink',
                toolbar: 'ecm'
            });
        }
    });

} )();
