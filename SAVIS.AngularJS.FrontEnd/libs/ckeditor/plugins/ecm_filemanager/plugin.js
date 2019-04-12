
/* @license Copyright (c) 2015-2016, SAVIS Vietnam Corporation. All rights reserved.
* SAVIS ECM Editor's Plugin
* Plugin : File Manager / Assert Manager
* Author : TruongND
* 25 Mar 2016
*/
(function(angular) {
    CKEDITOR.plugins.add('ecm_filemanager', {
        icons: 'ecm_filemanager',
        init: function( editor ) {
            editor.addCommand( 'ecmFileManagement', {
                exec: function (editor) {

                    var selection = editor.getSelection();

                    // Parse the editor to next popup
                    var data = editor.ecm.imageManager(editor, selection);

                }
            });
            editor.ui.addButton('ecm_filemanager', {
                label: 'Manage files in asserts',
                command: 'ecmFileManagement',
                toolbar: 'ecm'
            });
        }
    });

} )();
