package com.k123.cli.command;

import cn.hutool.core.io.FileUtil;
import picocli.CommandLine;

import java.io.File;
import java.util.List;

@CommandLine.Command(name = "list", description = "查看文件列表", mixinStandardHelpOptions = true)
public class ListCommand implements Runnable{
    //list，递归收集所有要生成的文件列表

    @Override
    public void run() {
        String projectPath = System.getProperty("user.dir");
        File parentFile = new File(projectPath).getParentFile();
        String inputPath = new File(parentFile, "my-generator-demo-project/acm").getAbsolutePath();
        List<File> files = FileUtil.loopFiles(inputPath);
        for (File file : files){
            System.out.println(file);
        }

    }
}
