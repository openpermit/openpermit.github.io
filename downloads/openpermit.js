// OpenPermit JavaScript library v1.0.0
// (c) ePermitHub - http://www.epermithub.org/openpermit.html
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
var op = typeof op !== 'undefined' ? op : {};

op.version = "1.0.0";

op.exportSymbol = function (opPath, object) {
    var tokens = opPath.split(".");
    var target = op;

    for (var i = 0; i < tokens.length - 1; i++)
        target = target[tokens[i]];
    target[tokens[tokens.length - 1]] = object;
};

(function () {

    function getField(fields, name) {
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].name.toUpperCase() === name.toUpperCase()) {
                return fields[i];
            }
        }

        return null;
    }

    function isInformational(conditions) {
        if (conditions[0].field === 'NEVER') {
            return true;
        }
    }

    function evaluateConditions(conditions, fields) {
        var field = getField(fields, conditions[0].field);
        if (field && field.value) {
            switch (field.datatype) {
                case 'numeric':
                    var fieldValue = parseFloat(field.value);
                    var conditionValue = parseFloat(conditions[0].value);
                    if (conditions[0].op) {
                        switch (conditions[0].op.toUpperCase()) {
                            case 'G':
                                return (fieldValue > conditionValue);
                            case 'GE':
                                return (fieldValue >= conditionValue);
                            case 'L':
                                return (fieldValue < conditionValue);
                            case 'LE':
                                return (fieldValue <= conditionValue);
                            default:
                                return (fieldValue == conditionValue);
                        }
                    }
                    else {
                        return (fieldValue == conditionValue);
                    }
                    break;
                case 'boolean':
                case 'list':
                    if (conditions[0].op) {
                        switch (conditions[0].op.toUpperCase()) {
                            case 'NOT':
                                return (field.value != conditions[0].value);
                            default:
                                return (field.value === conditions[0].value);
                        }
                        break;
                    }
                    else {
                        return (field.value === conditions[0].value);
                    }
            }
        }
        else {
            return null;
        }
    }

    function filterList(list, fields) {
        var filteredList = [];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.conditions) {
                if (isInformational(item.conditions)) {
                    item.required = false;
                    filteredList.push(item);
                }
                else {
                    var result = evaluateConditions(item.conditions, fields);
                    if (result == null) {
                        item.required = false;
                        filteredList.push(item);
                    }
                    else if (result) {
                        item.required = true;
                        filteredList.push(item);
                    }
                }
            }
            else {
                item.required = true;
                filteredList.push(item);
            }
        }

        return filteredList;
    }

    function filterChecklist(checklist) {
        var content = {};
        content.documents = filterList(checklist.documents, checklist.fields);
        content.disciplines = filterList(checklist.disciplines, checklist.fields);
        content.permits = filterList(checklist.permits, checklist.fields);
        content.fees = filterList(checklist.fees, checklist.fields);
        return content;
    }

    function evaluateFees(fees, fields) {
        var total = 0;
        for (var i = 0; i < fees.length; i++) {
            if (fees[i].required) {
                if (fees[i].value.indexOf('TOTAL') == -1) {
                    fees[i].value = evalFormula(fees[i].value, fields);
                    total += fees[i].value;
                }
            }
        }
        var totalField = [{ name: 'TOTAL', value: total }];
        for (var i = 0; i < fees.length; i++) {
            if (fees[i].required) {
                if (fees[i].value['constructor'] === String && fees[i].value.indexOf('TOTAL') > -1) {
                    fees[i].value = evalFormula(fees[i].value, totalField);
                    total += fees[i].value;
                }
            }
        }
        var totalRow = { name: "Total Fees", value: total };
        fees.push(totalRow);
    }

    function evalFormula(formula, fields) {
        var expression = formula;
        for (var i = 0; i < fields.length; i++) {
            expression = expression.replace(fields[i].name, fields[i].value);
        }
        // consider using math.js for safety
        return eval(expression);
    }

    function evaluateChecklist(checklist) {
        var content = filterChecklist(checklist);
        evaluateFees(content.fees, checklist.fields);
        return content;
    }

    function getFieldValues(fields) {
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].datatype === 'boolean') {
                fields[i].value = $('input[name=' + fields[i].name + ']:checked').val();
            }
            else if (fields[i].datatype === 'list') {
                fields[i].value = $('#' + fields[i].name + ' option:selected').text();
            }
            else {
                fields[i].value = $('#' + fields[i].name).val();
            }
        }
    }

    op.exportSymbol('evaluateChecklist', evaluateChecklist);
    op.exportSymbol('getFieldValues', getFieldValues);

}());
