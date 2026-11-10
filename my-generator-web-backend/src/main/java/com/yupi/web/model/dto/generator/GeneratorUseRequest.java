package com.yupi.web.model.dto.generator;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

/**
 * 使用生成器
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Data
public class GeneratorUseRequest implements Serializable {


    /**
     * id
     */
    private Long id;

    /**
     * 数据模型
     * 用Map，可以动态接收前端传来的表格转化的json数据
     */
    private Map<String, Object> dataModel;


    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}