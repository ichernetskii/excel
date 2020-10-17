import { $ } from "@core/DOM";
import { capitalize } from "@core/utils";

export function resizeHandler(event, $root) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        let dataResize = $resizer.dataset.resize;

        if (dataResize) {
            const $parent = $resizer.closest("[data-type='resizable']");
            const coords = $parent.getCoords();
            const $delimeter = $root.querySelector(`[data-type='delimeter${capitalize(dataResize)}']`);

            const dataColumn = $parent.dataset.column;
            const $column = $root.querySelectorAll(`[data-column = '${dataColumn}']`);

            const dataRow = $parent.closest("[data-row]").dataset.row;
            const $row = $root.querySelector(`[data-row = '${dataRow}']`);

            const moveDelimeter = function(e) {
                switch (dataResize) {
                    case "col":
                        $delimeter.css({
                            left: e.clientX + "px"
                        });
                        break;
                    case "row":
                        $delimeter.css({
                            top: e.clientY - $root.getCoords().top + "px"
                        });
                        break;
                }
            }

            $delimeter.show();
            moveDelimeter(event);

            document.onmousemove = moveDelimeter;

            document.onmouseup = e => {
                document.onmousemove = null;
                document.onmouseup = null;
                let delta;

                switch (dataResize) {
                    case "col":
                        delta = e.pageX - coords.right;
                        $column.forEach($item => $item.css({
                            width: coords.width + delta + "px"
                        }));
                        resolve({
                            value: coords.width + delta,
                            id: dataColumn
                        });
                        break;
                    case "row":
                        delta = e.pageY - coords.bottom;
                        $row.css({
                            height: coords.height + delta + "px"
                        });
                        resolve({
                            value: coords.height + delta,
                            id: dataRow
                        });
                        break;
                }

                $delimeter.hide();
                dataResize = "";
            };
        }
    });
}
