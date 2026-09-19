package com.k123.generator;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IORuntimeException;
import cn.hutool.core.util.ArrayUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class StaticGenerator {
    public static void main(String[] args) {
        //user.dir 是当前项目的根目录，是一个系统属性，可以通过 System.getProperty("user.dir") 获取。
        String rootPath = System.getProperty("user.dir");
        String inputPath = rootPath + File.separator + "my-generator-demo-projects" + File.separator + "acm";
        System.out.println(inputPath);
        String outputPath = rootPath;
        System.out.println(outputPath);
        copyFileByHutool(inputPath, outputPath);
    }

    /**
     * 拷贝文件
     * @param srcPath 输入路径
     * @param destPath 输出路径
     */
    public static void copyFileByHutool(String srcPath, String destPath) {

        FileUtil.copy(srcPath, destPath, false);
    }


    //自己实现的递归拷贝文件夹
    public static void copyFileByRecursive (File inputFile, File outputFile) throws IOException {
        //看看是目录还是文件，如果是目录需要先给dest复制一个同样的目录
        //然后使用递归进入目录重复上述逻辑
        if (inputFile.isDirectory()) {
            //是目录,复制一个空File对象给outputFile
            File tempDir = new File(outputFile, inputFile.getName());
            //还得调mkdirs真正落盘（不存在时才创）
            if (!tempDir.exists()) {
                tempDir.mkdirs();
            }
            //然后这个目录还不算复制完毕，还得进入这个目录，去看这个目录下的内容是什么
            File[] files = inputFile.listFiles();
            if(ArrayUtil.isEmpty(files))
            {
                return;
            }

            for (File file : files) {
                //递归调用
                copyFileByRecursive(file, tempDir);
            }

        }else {
            //是文件，直接复制
            Path path = outputFile.toPath().resolve(inputFile.getName());
            Files.copy(inputFile.toPath(), path, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    public static void copyFilesByRecursive(String srcPath, String destPath) {
        //先获得参数Path所对应的File对象
        File inputFile = new File(srcPath);
        File outputFile = new File(destPath);
        //目的是把src复制给dest
        //判断输入的File对象是否存在


        try{
            copyFileByRecursive(inputFile, outputFile);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
