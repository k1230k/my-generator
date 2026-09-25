package ${basePackage}.generator;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.ArrayUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class StaticGenerator {

    /**
     * 拷贝文件
     * @param srcPath 输入路径
     * @param destPath 输出路径
     */
    public static void copyFilesByHutool(String srcPath, String destPath) {

        FileUtil.copy(srcPath, destPath, false);
    }

}
