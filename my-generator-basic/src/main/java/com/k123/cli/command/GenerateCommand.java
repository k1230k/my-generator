package com.k123.cli.command;

import cn.hutool.core.bean.BeanUtil;
import com.k123.generator.MainGenerator;
import com.k123.model.MainTemplateConfig;
import lombok.Data;
import picocli.CommandLine.Option;
import picocli.CommandLine.Command;

import java.util.concurrent.Callable;


//generate命令的实现类,用于根据输入参数替换模板里的占位符，生成最终的代码文件

@Data
@Command(name = "generate", description = "根据模板生成代码文件", mixinStandardHelpOptions = true)
public class GenerateCommand implements Callable<Integer> {

    @Option(names = {"-a", "--author"}, description = "作者名称", arity = "0..1", interactive = true, echo = true)
    private String author = "k123";

    @Option(names = {"-l", "--loop"}, description = "是否循环生成", arity = "0..1", interactive = true, echo = true)
    private boolean loop = false;

    @Option(names = {"-o", "--output"}, description = "输出信息", arity = "0..1", interactive = true, echo = true)
    private String outputText = "输出结果 ";

    @Override
    public Integer call() throws Exception {
        //这里写用户根据option指引输入参数后，需要生成代码的逻辑
        System.out.println("生成代码文件中...");
        MainTemplateConfig config = new MainTemplateConfig();
        BeanUtil.copyProperties(this, config);
        System.out.println("生成代码文件完成，配置如下：" + config);
        MainGenerator.doGenerate(config);
        return 0;
    }
}
