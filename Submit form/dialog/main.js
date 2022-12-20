class Dialog {
    constructor(title, content, closeable) {
        this.title = title;
        this.content = content;
        this.closeable = closeable;
    }

    open() {
        var this_ = this;

        this.dialog = document.createElement('div');
        this.dialog.className = "dialog-container";
        this.dialog.innerHTML = '<div class="dialog-padding">'+
            '<div class="dialog">'+
                '<div class="dialog-header">'+
                    '<div class="dialog-title">'+
                        this.title+
                    '</div>'+
                '</div>'+
                '<div class="dialog-content">'+this.content+'</div>'+
                '<div class="dialog-footer"></div>'+
            '</div>'+
        '</div>';
        document.body.appendChild(this.dialog);
        
        if(this_.closeable) {
            this.dialog.onclick = function(e) {
                if(e.target == this) {
                    this_.close();
                }
            };

            var close_elem = document.createElement('div');
            close_elem.className = 'dialog-close';
            close_elem.onclick = function() {
                this_.close();
            }
            this.dialog.querySelector('.dialog').appendChild(close_elem);
        }
    }

    close() {
        this.dialog.remove();
    }
}