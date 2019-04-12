/*
 * SAVIS VIETNAM CORPORATION
 *
 * REDACTOR INSERTIMAGE PLUGINS
 * AUTHOR : SONPN
 *
 */

if (!RedactorPlugins) var RedactorPlugins = {};

(function ($) {
    RedactorPlugins.advanced = function () {
        return {
            getTemplate: function () {
                return String()
                + '<section class="modal-section" id="redactor-modal-advanced">'
                + '<label>Nhập link ảnh:</label>'
                + '<textarea id="mymodal-textarea" style="height: 200px;"></textarea>'
                + '</section>';
            },
            init: function () {
                var button = this.button.add('advanced', 'Chèn ảnh');
                this.button.addCallback(button, this.advanced.show);
                this.button.setAwesome('advanced', 'fa-picture-o');
            },
            show: function () {
                this.modal.addTemplate('advanced', this.advanced.getTemplate());
                this.modal.load('advanced', 'Chèn link ảnh', 600);
                this.modal.createCancelButton();

                var button = this.modal.createActionButton('Chèn');
                button.on('click', this.advanced.insert);

                this.selection.save();
                this.modal.show();

                //$('#mymodal-textarea').focus();
            },
            insert: function () {
                var html = $('#mymodal-textarea').val();
                var node = '&nbsp;<img src="' + html + '"/>'
                this.modal.close();
                this.selection.restore();

                this.buffer.set(); // for undo action
                this.insert.html(node);
                //var afterValue = this.caret.getOffset();
                //this.caret.setOffset(afterValue - 2);
            }
        };
    };
})(jQuery);