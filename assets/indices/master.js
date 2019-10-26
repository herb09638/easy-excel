window.CURRENT_INDICES=[{"title":"框架","link":"compare","nodes":[]},{"title":"导出","link":"export","nodes":[{"h2":"下载","h3":"","h4":"","name":"下载-h2","content":"Exporter::download方法可以通过浏览器下载导出的文件，该方法会根据文件名后缀自动判断导出的文件类型。  use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; // 导出xlsx类型文件 Excel::export($array)->download('users.xlsx'); Excel::xlsx($array)->download('users.xlsx'); // 导出csv类型文件 Excel::export($array)->download('users.csv'); Excel::csv($array)->download('users.csv'); // 导出ods类型文件 Excel::export($array)->download('users.ods'); Excel::ods($array)->download('users.ods');"},{"h2":"保存文件","h3":"","h4":"","name":"保存文件-h2","content":"Exporter::store方法可以保存导出的文件到服务器，该方法会根据文件名后缀自动判断导出的文件类型。  use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; // 导出xlsx类型文件 Excel::export($array)->store('users.xlsx'); Excel::xlsx($array)->store('users.xlsx'); // 导出csv类型文件 Excel::export($array)->store('users.csv'); Excel::csv($array)->store('users.csv'); // 导出ods类型文件 Excel::export($array)->store('users.ods'); Excel::ods($array)->store('users.ods');"},{"h2":"保存文件","h3":"Filesystem","h4":"","name":"Filesystem-h3","content":"Easy Excel 对 league/flysystem 提供了支持，通过 Filesystem 可以轻松的把文件保存到任意服务器，比如阿里云OSS。  这里只为演示用法，如需保存到第三方云存储服务器，则找到相应的adapter实现包即可。  use Dcat\\EasyExcel\\Excel; use League\\Flysystem\\Adapter\\Local; use League\\Flysystem\\Filesystem; $array = [...]; $adapter = new Local(__DIR__); $filesystem = new Filesystem($adapter); Excel::export($array)->disk($filesystem)->store('users.xlsx'); "},{"h2":"保存文件","h3":"在Laravel中使用Filesystem","h4":"","name":"在Laravel中使用Filesystem-h3","content":"Easy Excel 对 Laravel 的 Filesystem 也提供了支持：  打开 config/filesystems.php 中找到如下配置：  return [ ... 'disks' => [ 'local' => [ 'driver' => 'local', 'root' => storage_path('app'), ], ... ], ];  使用：  use Dcat\\EasyExcel\\Excel; $array = [...]; // local 对应配置参数 config('filesystems.disks.local') Excel::export($array)->disk('local')->store('users.xlsx'); // 也可以 Excel::export($array)->disk(Storage::disk('local'))->store('users.xlsx');"},{"h2":"获取文件内容","h3":"","h4":"","name":"获取文件内容-h2","content":"Exporter::raw方法可以获取导出的文件的内容。  use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; // 导出xlsx类型文件 $xlsxContents = Excel::export($array)->xlsx()->raw(); $xlsxContents = Excel::xlsx($array)->raw(); // 导出csv类型文件 $csvContents = Excel::export($array)->csv()->raw(); $csvContents = Excel::csv($array)->raw(); // 导出ods类型文件 $odsContents = Excel::export($array)->ods()->raw(); $odsContents = Excel::ods($array)->raw();"},{"h2":"设置导出数据","h3":"","h4":"","name":"设置导出数据-h2","content":"Easy Excel 提供了多种实用的设置导出数据的接口。"},{"h2":"设置导出数据","h3":"数组","h4":"","name":"数组-h3","content":"use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; $exporter = Excel::export($array);  如果传入的参数是带有 toArray 方法的对象也是可以的  use Dcat\\EasyExcel\\Excel; use Dcat\\EasyExcel\\Support\\SheetCollection; $collection = new SheetCollection([ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]); $exporter = Excel::export($collection);"},{"h2":"设置导出数据","h3":"分块获取","h4":"","name":"分块获取-h3","content":"Easy Excel 支持分块获取并导出数据，当导出的数据比较多时这个功能非常实用。   此功能的实现原理是使用while循环获取匿名函数返回的值，如果匿名函数返回的结果不为空则循环会一直进行下去，所以需要注意不能让匿名函数的返回值一直不为空。   use Dcat\\EasyExcel\\Excel; use App\\User; $exporter = Excel::export($generatorFactory()) ->chunk(function (int $times) { // $times 表示循环次数，从1开始，可以当做查询页数实用 // 每次获取1000条数据导入 $chunkSize = 1000; // 只查询前10页数据 if ($times > 10) { return; } // 当数据库查不到值时会停止执行闭包内的逻辑 return User::query()->forPage($times, $chunkSize)->get(); }) ->download('users.xlsx');"},{"h2":"设置导出数据","h3":"生成器","h4":"","name":"生成器-h3","content":"use Dcat\\EasyExcel\\Excel; // 这里纯粹是为了演示功能，这段代码没有实际意义 $generatorFactory = function () { $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; foreach ($array as $value) { yield $value; } }; $exporter = Excel::export($generatorFactory());   在Laravel中可以使用 Eloquent::cursor  use Dcat\\EasyExcel\\Excel; use App\\User; $exporter = Excel::export(User::query()->cursor()->getIterator());"},{"h2":"设置导出数据","h3":"匿名函数","h4":"","name":"匿名函数-h3","content":"在匿名函数中可以返回数组、对象（toArray）和生成器。  use Dcat\\EasyExcel\\Excel; use Dcat\\EasyExcel\\Support\\SheetCollection; $exporter = Excel::export(function () { return new SheetCollection([ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]); });"},{"h2":"设置导出数据","h3":"导出数据到多个sheet表格","h4":"","name":"导出数据到多个sheet表格-h3","content":" 此功能只支持导出 xlsx 和 ods 类型文件，如果是 csv 只能导出到一个sheet表格。   数组  use Dcat\\EasyExcel\\Excel; $sheetArray1 = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; $sheetArray2 = [...]; $sheets = [ 'sheet名称1' => $sheetArray1, 'sheet名称2' => $sheetArray2, ... ]; Excel::export($sheets)->store('users.xlsx');  分块  use Dcat\\EasyExcel\\Excel; use App\\User; $sheets = [ 'sheet名称1' => function (int $times) { if ($times > 10) { return; } // 查询前10页数据 return User::query()->forPage($times, 1000)->get(); }, 'sheet名称2' => function (int $times) { $times += 10; // 查询10页之后的数据 return User::query()->forPage($times, 1000)->get(); }, ... ]; Excel::export()->chunk($sheets)->store('users.xlsx');  生成器  use Dcat\\EasyExcel\\Excel; use App\\User; $sheets = [ 'sheet名称1' => User::query()->forPage(1, 1000)->cursor()->getIterator(), 'sheet名称2' => User::query()->forPage(2, 1000)->cursor()->getIterator(), ... ]; Excel::export($sheets)->store('users.xlsx');  匿名函数  use Dcat\\EasyExcel\\Excel; use App\\User; // 匿名函数可以返回纯数组、对象或生成器 $sheets = function () { return [ 'sheet名称1' => User::query()->forPage(1, 1000)->cursor()->getIterator(), 'sheet名称2' => User::query()->forPage(2, 1000)->cursor()->getIterator(), ... ]; }; Excel::export($sheets)->store('users.xlsx')"},{"h2":"设置标题","h3":"","h4":"","name":"设置标题-h2","content":"Exporter::headings 方法可以直接设置要导出的文件的标题，并且可以根据标题控制列的排序。  use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; // 设置标题，丢弃created_at字段，并更改列的先后顺序， $headings = [ 'id' => 'ID', 'email' => '邮箱', 'name' => '名称', ]; // 最后导出的列只有 id、email、name Excel::export($array)->headings($headings)->download('users.xlsx');  效果 "},{"h2":"设置标题","h3":"禁用标题行","h4":"","name":"禁用标题行-h3","content":"如果不想导出的文件中带有标题行，可以通过以下方式禁用标题行  use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ... ]; // 传入 false 即可 Excel::export($array)->headings(false)->download('users.xlsx');"},{"h2":"设置标题","h3":"标题样式","h4":"","name":"标题样式-h3","content":" 关于Excel表格的样式定义可以参考文档 box/spout。   use Box\\Spout\\Writer\\Common\\Creator\\Style\\StyleBuilder; use Box\\Spout\\Common\\Entity\\Style\\Color; use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '...'], ]; Excel::export($array) ->headings(function () { $headings = [ 'id' => 'ID', 'email' => '邮箱', 'name' => '名称', ]; // 定义样式 $style = (new StyleBuilder()) ->setFontBold() ->setFontSize(15) ->setFontColor(Color::BLUE) ->setShouldWrapText() ->setBackgroundColor(Color::YELLOW) ->build(); return [$headings, $style]; }) ->download('users.xlsx');  效果 "},{"h2":"设置内容样式","h3":"","h4":"","name":"设置内容样式-h2","content":" 关于Excel表格的样式定义可以参考文档 box/spout。 "},{"h2":"设置内容样式","h3":"设置行样式","h4":"","name":"设置行样式-h3","content":"use Box\\Spout\\Writer\\Common\\Creator\\WriterEntityFactory; use Box\\Spout\\Writer\\Common\\Creator\\Style\\StyleBuilder; use Box\\Spout\\Common\\Entity\\Style\\Color; use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '2019-10-19 00:37:22'], ['id' => 2, 'name' => 'Eichmann', 'email' => 'josefa@eg.com', 'created_at' => '2019-10-19 00:37:22'], ]; Excel::export($array) ->row(function (array $row) { // 直接返回原数组，什么也不改变 if ($row['id'] > 1) { return $row; } // 设置样式 $style = (new StyleBuilder()) ->setFontSize(13) ->setFontColor(Color::LIGHT_BLUE) ->setShouldWrapText() ->build(); return WriterEntityFactory::createRowFromArray($row, $style); }) ->download('users.xlsx');  效果 "},{"h2":"设置内容样式","h3":"设置默认样式","h4":"","name":"设置默认样式-h3","content":"use Box\\Spout\\Writer\\Common\\Creator\\Style\\StyleBuilder; use Box\\Spout\\Common\\Entity\\Style\\Color; use Dcat\\EasyExcel\\Excel; $array = [ ['id' => 1, 'name' => 'Brakus', 'email' => 'treutel@eg.com', 'created_at' => '2019-10-19 00:37:22'], ... ]; Excel::export($array) ->option(function ($writer) { // 设置样式 $style = (new StyleBuilder()) ->setFontSize(13) ->setFontColor(Color::LIGHT_BLUE) ->setShouldWrapText() ->build(); $writer->setDefaultRowStyle($style); }) ->download('users.xlsx');"}]},{"title":"导入","link":"import","nodes":[{"h2":"设置文件路径","h3":"","h4":"","name":"设置文件路径-h2","content":"Easy Excel 会根据传入的文件名后缀自动判断需要读取的文件类型。  use Dcat\\EasyExcel\\Excel; // 导入xlsx $allSheets = Excel::import('/tmp/users.xlsx')->toArray(); // 导入csv $allSheets = Excel::import('/tmp/users.csv')->toArray(); // 导入ods $allSheets = Excel::import('/tmp/users.ods')->toArray();"},{"h2":"设置文件路径","h3":"UploadFile","h4":"","name":"UploadFile-h3","content":"Laravel 和 Symfony 框架中可以直接导入浏览器上传的文件  use Dcat\\EasyExcel\\Excel; use Illuminate\\Http\\Request; class IndexController { public function upload(Request $request) { // 直接读取前端上传的文件 $allSheets = Excel::import($request->file('user_data'))->toArray(); } }"},{"h2":"设置文件路径","h3":"Filesystem","h4":"","name":"Filesystem-h3","content":"Easy Excel 对 league/flysystem 提供了支持，通过 Filesystem 可以轻松的读取任意服务器上的文件。   此方法会将文件从文件所在服务器下载到本项目服务器临时目录，然后再读取文件内容。如果文件所在服务器和当前项目服务器都是同一台，则会造成资源浪费。   use Dcat\\EasyExcel\\Excel; use League\\Flysystem\\Adapter\\Local; use League\\Flysystem\\Filesystem; $adapter = new Local(__DIR__); $filesystem = new Filesystem($adapter); $allSheets = Excel::import('users.xlsx')->disk($filesystem)->toArray();"},{"h2":"设置文件路径","h3":"在Laravel中使用Filesystem","h4":"","name":"在Laravel中使用Filesystem-h3","content":"Easy Excel 对 Laravel 的 Filesystem 也提供了支持：  打开 config/filesystems.php 中找到如下配置：  return [ ... 'disks' => [ 'local' => [ 'driver' => 'local', 'root' => storage_path('app'), ], ... ], ];  使用：  use Dcat\\EasyExcel\\Excel; $array = [...]; // local 对应配置参数 config('filesystems.disks.local') $allSheets = Excel::import('users.xlsx')->disk('local')->toArray(); // 也可以 $allSheets = Excel::import('users.xlsx')->disk(Storage::disk('local'))->toArray();"},{"h2":"标题","h3":"","h4":"","name":"标题-h2","content":"Easy Excel 默认会把Excel表格中的第一行数据当做标题，然后合并到读取的数据行中（作为数据行的key使用）。如果开发者想使用自定义标题，则可以以下方式设置：   此处设置的标题无法改变列顺序。   use Dcat\\EasyExcel\\Excel; $headings = ['id', 'email', 'name']; // 导入xlsx $allSheets = Excel::import('/tmp/users.xlsx')->headings($headings)->toArray(); var_dump($allSheets);  将得到如下结果  [ 'Sheet1' => [ 2 => ['id' => 1, 'email' => 'treutel@eg.com', 'name' => 'Brakus'], 3 => ['id' => 2, 'email' => 'josefa@eg.com', 'name' => 'Eichmann'], ], ];"},{"h2":"标题","h3":"指定标题所在的行","h4":"","name":"指定标题所在的行-h3","content":"如果标题不在第一行，则可以通过以下方法轻松的指定标题所在的行  use Dcat\\EasyExcel\\Excel; $headings = ['id', 'email', 'name']; // 指定第二行为标题行 $allSheets = Excel::import('/tmp/users.xlsx') ->headings($headings) ->headingRow(2) ->toArray(); // 也可以传闭包 $allSheets = Excel::import('/tmp/users.xlsx') ->headings($headings) ->headingRow(function (int $line, array $row) { // $line 为数据行在excel表中的行号，$row 为数据行内容 return $line == 2; }) ->toArray(); var_dump($allSheets);  将得到如下结果  [ 'Sheet1' => [ 3 => ['id' => 1, 'email' => 'treutel@eg.com', 'name' => 'Brakus'], 4 => ['id' => 2, 'email' => 'josefa@eg.com', 'name' => 'Eichmann'], ], ];"},{"h2":"标题","h3":"禁用标题","h4":"","name":"禁用标题-h3","content":"use Dcat\\EasyExcel\\Excel; // 导入xlsx $allSheets = Excel::import('/tmp/users.xlsx')->headings(false)->toArray(); var_dump($allSheets);  将得到如下结果  [ 'Sheet1' => [ 2 => [1, 'treutel@eg.com', 'Brakus'], 3 => [2, 'josefa@eg.com', 'Eichmann'], ], ];"},{"h2":"读取数据","h3":"toArray","h4":"","name":"toArray-h3","content":"把所有表格数据转化为数组。  use Dcat\\EasyExcel\\Excel; // 导入xlsx $allSheets = Excel::import('/tmp/users.xlsx')->toArray(); var_dump($allSheets);  结果  [ // 如果是xlsx和ods文件，此处下标为工作表名称，即 Sheet1 // 如果是csv文件，此处下标为工作表序号，从 0 开始 'Sheet1' => [ // 此处下标是行号，由于标题占用了 1 行，所以数据行一般是从 2 开始 2 => ['id' => 1, 'email' => 'treutel@eg.com', 'name' => 'Brakus'], 3 => ['id' => 2, 'email' => 'josefa@eg.com', 'name' => 'Eichmann'], ], ];"},{"h2":"读取数据","h3":"collect","h4":"","name":"collect-h3","content":"把所有表格数据转化为 SheetCollection 对象。   没错！SheetCollection 的功能与 Laravel 中的 collection 的功能是一模一样的，collection 对数组的操作非常方便，所以此处集成进来了。   use Dcat\\EasyExcel\\Excel; // 导入xlsx $allSheetsCollection = Excel::import('/tmp/users.xlsx')->collect();"},{"h2":"读取数据","h3":"each","h4":"","name":"each-h3","content":"循环sheet表格  use Dcat\\EasyExcel\\Excel; use Dcat\\EasyExcel\\Contracts\\Sheet as SheetInterface; Excel::import('/tmp/users.xlsx')->each(function (SheetInterface $sheet) { // 单独处理每个表格内容 $sheetArray = $sheet->toArray(); // 获取表格名称，如果是csv文件，则此方法返回空字符串 $sheetName = $sheet->getName(); // 表格序号，从 0 开始 $sheetIndex = $sheet->getIndex(); var_dump($sheetArray); })  打印结果  [ // 此处下标是行号，由于标题占用了 1 行，所以数据行一般是从 2 开始 2 => ['id' => 1, 'email' => 'treutel@eg.com', 'name' => 'Brakus'], 3 => ['id' => 2, 'email' => 'josefa@eg.com', 'name' => 'Eichmann'], ]"},{"h2":"读取数据","h3":"first","h4":"","name":"first-h3","content":"读取第一个表格内容  use Dcat\\EasyExcel\\Excel; // Dcat\\EasyExcel\\Contracts\\Sheet $sheet = Excel::import('/tmp/users.xlsx')->first(); // 表格名称 $sheetName = $sheet->getName(); var_dump($sheet->toArray());  打印结果  [ // 此处下标是行号，由于标题占用了 1 行，所以数据行一般是从 2 开始 2 => ['id' => 1, 'email' => 'treutel@eg.com', 'name' => 'Brakus'], 3 => ['id' => 2, 'email' => 'josefa@eg.com', 'name' => 'Eichmann'], ]"},{"h2":"读取数据","h3":"active","h4":"","name":"active-h3","content":"读取保存文件前打开的表格内容  use Dcat\\EasyExcel\\Excel; $activeSheetArray = Excel::import('/tmp/users.xlsx')->active()->toArray(); var_dump($activeSheetArray);"},{"h2":"读取数据","h3":"sheet","h4":"","name":"sheet-h3","content":"根据表格名称或位置索引读取指定表格内容，默认的表格名称通常为 Sheet1。   CSV 文件不支持根据名称读取表格内容。   use Dcat\\EasyExcel\\Excel; // 根据表格名称读取表格内容 $sheet1 = Excel::import('/tmp/users.xlsx')->sheet('Sheet1'); // 根据表格的位置索引读取指定表格内容 $firstSheet = Excel::import('/tmp/users.xlsx')->sheet(0);"},{"h2":"Sheet操作接口","h3":"","h4":"","name":"Sheet操作接口-h2","content":"Easy Excel 提供了一些非常简单实用的接口用于读取表格数据。"},{"h2":"Sheet操作接口","h3":"分块读取","h4":"","name":"分块读取-h3","content":"当数据表内容比较多时，使用分块读取功能可以有效减少内存消耗，提高效率。  操作所有表格  use Dcat\\EasyExcel\\Excel; use Dcat\\EasyExcel\\Contracts\\Sheet as SheetInterface; use Dcat\\EasyExcel\\Support\\SheetCollection; Excel::import('/tmp/users.xlsx')->each(function (SheetInterface $sheet) { // 每100行数据为一批数据进行读取 $chunkSize = 100; $sheet->chunk($chunkSize, function (SheetCollection $collection) { // 此处的数组下标依然是excel表中数据行的行号 $rows = $collection->toArray(); ... }); })  操作单表格  use Dcat\\EasyExcel\\Excel; use Dcat\\EasyExcel\\Contracts\\Sheet as SheetInterface; use Dcat\\EasyExcel\\Support\\SheetCollection; // 每100行数据为一批数据进行读取 $chunkSize = 100; Excel::import('/tmp/users.xlsx') ->first() ->chunk($chunkSize, function (SheetCollection $collection) { // 此处的数组下标依然是excel表中数据行的行号 $rows = $collection->toArray(); ... });"},{"h2":"Sheet操作接口","h3":"过滤数据行","h4":"","name":"过滤数据行-h3","content":"可以通过 Sheet::filter 方法过滤掉读取到的数据行  use Dcat\\EasyExcel\\Excel; use Dcat\\EasyExcel\\Contracts\\Sheet as SheetInterface; use Dcat\\EasyExcel\\Support\\SheetCollection; // 每100行数据为一批数据进行读取 $chunkSize = 100; $headings = ['id', 'email', 'name']; Excel::import('/tmp/users.xlsx') ->headings($headings) ->first() ->filter(function (array $row, int $line) { // 过滤掉id小于10或者行号小于5的数据行 return $row['id'] > 10 && $line > 5; }) ->chunk($chunkSize, function (SheetCollection $collection) { ... });"}]},{"title":"概述","link":"installation","nodes":[{"h2":"","h3":"","h4":"","name":"","content":"Easy Excel是一个基于 box/spout 封装的Excel读写工具，可以帮助开发者更快速更轻松的读写Excel文件， 并且无论读取多大的文件只需占用极少的内存。 由于box/spout只支持读写xlsx、csv、ods等类型文件，所以本项目目前也仅支持读写这三种类型的文件。 "},{"h2":"","h3":"环境","h4":"","name":"环境-h3","content":"PHP >= 7.1 PHP extension php_zip PHP extension php_xmlreader box/spout >= 3.0 league/flysystem >= 1.0"},{"h2":"","h3":"安装","h4":"","name":"安装-h3","content":"composer require dcat/easy-excel"}]},{"title":"常见问题","link":"qa","nodes":[]},{"title":"更新日志","link":"update","nodes":[]}]