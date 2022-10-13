/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
/**@license (C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
var Database = (function (window, $Database) {"use strict";
    
    if (window[$Database] && !window.opera) return window[$Database];
    
    /**
     * Copyright (C) 2011 by Andrea Giammarchi, @WebReflection
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     * 
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
     
    
    function Database(options) {
        
        if (!(this instanceof Database))
            return new Database(options)
        ;
        
        var self = this;
        
        options || (options = {});
        
        // internal db invisible outside the closure
        defineProperty(self, expando, {
            enumerable: !1,
            writable: !0,
            configurable: !0,
            value: openDatabase(
                self.name = options.name || document.domain.replace(/\./g, "-") || "db",
                self.version = options.version || "1.0",
                self.description = options.description || "data",
                self.size = options.size || SIZE,
                empty
            )
        });
        
        // but internal db can reach self inside the closure
        self[expando][expando] = self;
        
        return self;
    }
    
    
    function close() {
        // hoping that Browsers will call asyncClose on their side
        // cannot actually remove references or transactions may fail
        // this[expando][expando] = null;
        // delete this[expando];
    }
    
    function create(name, fields, fn) {
        fields[0] || (fields[0] = autoIncrement);
        this.query("CREATE" + TABLE + IF + " NOT" + EXISTS + name + " (" + fields.join(", ") + ")", fn);
        return this;
    }
    
    function createReadOrQuery(method) {
        method += "ransaction";
        return function readOrWrite(SQL, A, fn) {
            var self = this;
            if (typeof A == "function") {
                fn = A;
                A = [];
            }
            self[expando][method](function (t) {
                for (var
                    sql = arrayfy(SQL),
                    a = toListOfParameters(A),
                    i = 0,
                    length = max(sql.length, a.length),
                    tr = (t[expando] = {self:self, fn:fn, i:length}),
                    tmp;
                    i < length; ++i
                ) {
                    t.executeSql(sql[i] || sql[0], a[i], success, error);
                }
            });
            return self;
        };
    }
    
    function drop(name, fn) {
        this.query(DROP + TABLE + IF + EXISTS + name, fn);
        return this;
    }
    
    function error(t, result) {
        if (t = t[expando]) {
            --t.i || (t.fn || empty)({
                type: "error",
                error: result,
                db: t.self
            });
        }
    }
    
    function insert(name, values, fn) {
        for (var
            self = this,
            sql = [],
            a = toListOfParameters(values),
            i = 0, length = a.length,
            many = Array(a[0].length + 1).join(", ?").slice(2);
            i < length; ++i
        ) {
            sql[i] = 'INSERT INTO ' + name + ' VALUES (' + many + ')';
        }
        self.query(sql, a, fn);
        return self;
    }
    
    function success(t, result) {
        if (t = t[expando]) {
            --t.i || (t.fn || empty)({
                type: "success",
                result: result,
                item: eventItem,
                length: result.rows.length,
                db: t.self
            });
        }
    }
    
    function truncate(name, fn) {
        var
            self = this,
            rows, item
        ;
        self.query('SELECT * FROM sqlite_master WHERE name = ?', arrayfy(name), function (e) {
            if (e.type == "success") {
                item = e.length && e.result.rows.item(0);
                if (item && item.type == "table" && (item.tbl_name || item.name) == name) {
                    // safer to perform double transaction here
                    // due XUL native SQLite problems that actually "waried me" ...
                    return self.query(DROP + TABLE + name, function (e) {
                        self.query(item.sql, fn);
                    });
                }
                e.type = "error";
                e.error = {message: "table " + name + " does not exists"};
                delete e.result;
            }
            fn(e);
        });
        return self;
    }
    
    
    function arrayfy(whatever) {
        return concat.call([], whatever === undefined ? [] : whatever);
    }
    
    function empty() {}
    
    function eventItem(i) {
        return this.result.rows.item(i);
    }
    
    function toListOfParameters(values) {
        return !isArray(values) || typeof values[0] != "object" || !values[0] ? [values] : values;
    }
    
    
    var
        undefined,
        SIZE = 5 * 1024 * 1024,
        TABLE = " TABLE ",
        DROP = "DROP",
        EXISTS = " EXISTS ",
        IF = "IF",
        autoIncrement = "id INTEGER PRIMARY KEY AUTOINCREMENT",
        Array = window.Array,
        Math = window.Math,
        max = Math.max,
        concat = [].concat,
    
        read = createReadOrQuery("readT"),
        query = createReadOrQuery("t"),
        document = window.document,
        openDatabase = window.openDatabase,
        expando = "_" + ("" + Math.random()).slice(2),
        isArray = Array.isArray || function (toString, a) {
            a = toString.call([]);
            return function isArray(o) {
                return a == toString.call(o);
            };
        }({}.toString),
        Object = window.Object,
        defineProperty = Object.defineProperty || function (o, k, d) {
            o[k] = d.value;
            return o;
        },
        DatabasePrototype = Database.prototype
    
    
    ;
    
    DatabasePrototype.close = close;
    DatabasePrototype.create = create;
    DatabasePrototype.drop = drop;
    DatabasePrototype.insert = insert;
    DatabasePrototype.read = read;
    DatabasePrototype.query = query;
    DatabasePrototype.truncate = truncate;
    
    
    return Database;
    
}(this, "Database"));