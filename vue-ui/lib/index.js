import { defineComponent, openBlock, createElementBlock, Fragment, createCommentVNode, createElementVNode, normalizeClass, normalizeStyle, resolveComponent, createBlock, renderSlot, ref, onMounted, watch, createTextVNode, toDisplayString, withDirectives, vModelDynamic, createVNode, vModelText, Transition, withCtx } from 'vue';

const useClick = (emit) => {
    const onClick = (e) => {
        emit('on-click', e);
    };
    return { onClick };
};

var script$3 = defineComponent({
    name: 'MeIcon',
    emits: ['on-click'],
    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const { onClick } = useClick(emit);
        return {
            onClick
        };
    }
});

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" 图标 "),
    createElementVNode("i", {
      class: normalizeClass(["iconfont me-icon", _ctx.name]),
      style: normalizeStyle(`color:${_ctx.color};font-size:${_ctx.size};`),
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onClick && _ctx.onClick(...args)))
    }, null, 6 /* CLASS, STYLE */)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

script$3.render = render$3;
script$3.__file = "packages/MeIcon/index.vue";

script$3.install = (app) => {
    app.component(script$3.name, script$3);
};
const InMeIcon = script$3;

const useHandler = (emit) => {
    const onClick = (e) => {
        emit('on-click', e);
    };
    return { onClick };
};

var script$2 = defineComponent({
    name: 'MeButton',
    components: {
        MeIcon: InMeIcon
    },
    emits: ['on-click'],
    props: {
        nativeType: {
            type: String,
            default: 'button'
        },
        width: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            validator: (value) => value === 'default' || value === 'primary' || value === 'success' || value === 'info' || value === 'warning' || value === 'danger',
            default: 'default'
        },
        plain: {
            type: Boolean
        },
        disabled: {
            type: Boolean
        },
        icon: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const { onClick } = useHandler(emit);
        return { onClick };
    }
});

const _hoisted_1$2 = ["type"];

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_me_icon = resolveComponent("me-icon");

  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" 按钮 "),
    createElementVNode("button", {
      type: _ctx.nativeType,
      class: normalizeClass(["me-btn", `me-btn-${_ctx.type} ${_ctx.plain ? 'me-btn-plain' : ''} ${_ctx.disabled ? 'disabled' : ''}`]),
      style: normalizeStyle(`width:${_ctx.width}; color:${_ctx.type === 'default' || _ctx.plain ? _ctx.color : '#fff'}; background:${!_ctx.plain ? _ctx.color : '#fff'}; border-color:${_ctx.color};`),
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onClick && _ctx.onClick(...args)))
    }, [
      (_ctx.icon)
        ? (openBlock(), createBlock(_component_me_icon, {
            key: 0,
            name: _ctx.icon,
            color: `${_ctx.type === 'default' || _ctx.plain ? _ctx.color : '#fff'}`,
            size: "16px"
          }, null, 8 /* PROPS */, ["name", "color"]))
        : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default")
    ], 14 /* CLASS, STYLE, PROPS */, _hoisted_1$2)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

script$2.render = render$2;
script$2.__file = "packages/MeButton/index.vue";

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};
const InMeButton = script$2;

const useSms = (props, emit) => {
    const sms = ref();
    const handleSMS = (e) => {
        !props.smsIs && emit('on-click-sms', e);
    };
    return { sms, handleSMS };
};
const useIcon = (props, emit, inputType) => {
    const handleIcon = (e) => {
        if (props.password) {
            inputType.value = inputType.value === 'password' ? 'text' : 'password';
        }
        else {
            emit('on-click-icon', e);
        }
    };
    return { handleIcon };
};
const useInput = (props, emit, sms) => {
    const inputLabel = ref();
    const inputVal = ref('');
    const inputType = ref(props.digit ? 'text' : props.password ? 'password' : props.type);
    const paddingLeft = ref(0);
    const paddingRight = ref(0);
    const isFocus = ref(false);
    const setInputPadding = (type) => {
        if (type === 1) {
            paddingRight.value = !props.smsMsg ? 10 : sms.value?.offsetWidth;
        }
        else {
            paddingLeft.value = !props.label ? 10 : Math.max(parseFloat(props.labelWidth || '0'), inputLabel.value?.offsetWidth);
        }
    };
    const onFocus = (e) => {
        isFocus.value = !isFocus.value;
        emit('on-focus', e);
    };
    const onBlur = (e) => {
        isFocus.value = !isFocus.value;
        emit('on-blur', e);
    };
    const onChange = (e) => {
        isFocus.value = !isFocus.value;
        emit('on-change', e);
    };
    const onInput = (e) => {
        isFocus.value = !isFocus.value;
        emit('on-input', e);
    };
    onMounted(() => {
        setInputPadding(0);
        setInputPadding(1);
    });
    watch(() => props.modelValue, value => {
        inputVal.value = value;
    }, {
        immediate: true
    });
    watch(inputVal, (value, oldValue) => {
        props.digit && !/^\d*$/g.test(value) && (inputVal.value = +oldValue);
        emit('update:modelValue', value);
    });
    watch(() => props.smsIs, () => {
        setInputPadding(1);
    });
    return {
        inputLabel,
        inputVal,
        inputType,
        paddingLeft,
        paddingRight,
        isFocus,
        onFocus,
        onBlur,
        onChange,
        onInput
    };
};

var script$1 = defineComponent({
    name: 'MeInput',
    components: {
        MeIcon: InMeIcon
    },
    emits: ['update:modelValue', 'on-focus', 'on-blur', 'on-change', 'on-input', 'on-click-sms', 'on-click-icon'],
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: '请输入...'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: String,
            default: ''
        },
        labelAlign: {
            type: String,
            default: 'left'
        },
        labelColor: {
            type: String,
            default: ''
        },
        labelIcon: {
            type: String,
            default: ''
        },
        focusType: {
            type: String,
            default: 'default'
        },
        focusColor: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        password: {
            type: Boolean,
            default: false
        },
        digit: {
            type: Boolean,
            default: false
        },
        smsMsg: {
            type: String,
            default: ''
        },
        smsColor: {
            type: String,
            default: ''
        },
        smsIs: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const { sms, handleSMS } = useSms(props, emit);
        const { inputLabel, inputVal, inputType, paddingLeft, paddingRight, isFocus, onFocus, onBlur, onChange, onInput } = useInput(props, emit, sms);
        const { handleIcon } = useIcon(props, emit, inputType);
        return { sms, handleSMS, inputLabel, inputVal, inputType, paddingLeft, paddingRight, isFocus, onFocus, onBlur, onChange, onInput, handleIcon };
    }
});

const _hoisted_1$1 = ["type", "placeholder", "readonly", "disabled"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_me_icon = resolveComponent("me-icon");

  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" 输入框 "),
    createElementVNode("div", {
      class: normalizeClass(["me-input", `me-input-${_ctx.focusType}`])
    }, [
      (_ctx.label)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "u-label",
            style: normalizeStyle(`width:${_ctx.labelWidth};text-align-last:${_ctx.labelAlign};color:${_ctx.labelColor};`),
            ref: "inputLabel"
          }, [
            (_ctx.labelIcon)
              ? (openBlock(), createBlock(_component_me_icon, {
                  key: 0,
                  name: _ctx.labelIcon,
                  color: _ctx.labelColor,
                  size: "inherit"
                }, null, 8 /* PROPS */, ["name", "color"]))
              : createCommentVNode("v-if", true),
            createTextVNode(" " + toDisplayString(_ctx.label), 1 /* TEXT */)
          ], 4 /* STYLE */))
        : createCommentVNode("v-if", true),
      withDirectives(createElementVNode("input", {
        type: _ctx.inputType,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.inputVal) = $event)),
        class: "u-input",
        placeholder: _ctx.placeholder,
        style: normalizeStyle(`${_ctx.isFocus && `border-color:${_ctx.focusColor};`};padding-right:${_ctx.paddingRight}px;padding-left:${_ctx.paddingLeft}px;`),
        onFocus: _cache[1] || (_cache[1] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args))),
        onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
        onChange: _cache[3] || (_cache[3] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
        onInput: _cache[4] || (_cache[4] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
        readonly: _ctx.readonly,
        disabled: _ctx.disabled
      }, null, 44 /* STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1$1), [
        [vModelDynamic, _ctx.inputVal]
      ]),
      (_ctx.password)
        ? (openBlock(), createBlock(_component_me_icon, {
            key: 1,
            name: _ctx.inputType == 'password' ? 'icon-in_biyan' : 'icon-in_zhengyan',
            onOnClick: _ctx.handleIcon
          }, null, 8 /* PROPS */, ["name", "onOnClick"]))
        : (openBlock(), createBlock(_component_me_icon, {
            key: 2,
            name: _ctx.icon,
            onOnClick: _ctx.handleIcon
          }, null, 8 /* PROPS */, ["name", "onOnClick"])),
      (!_ctx.password && _ctx.smsMsg)
        ? (openBlock(), createElementBlock("span", {
            key: 3,
            class: normalizeClass(["u-sms", { countdown: _ctx.smsIs }]),
            onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.handleSMS && _ctx.handleSMS(...args))),
            ref: "sms",
            style: normalizeStyle(`color:${_ctx.smsColor};`)
          }, toDisplayString(_ctx.smsMsg), 7 /* TEXT, CLASS, STYLE */))
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

script$1.render = render$1;
script$1.__file = "packages/MeInput/index.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};
const InMeInput = script$1;

const useSearch = (props, emit) => {
    const inputVal = ref(props.modelValue);
    const onKeypress = (e) => {
        e.key === 'Enter' && emit('on-search');
    };
    const onFocus = (e) => {
        emit('on-focus', e);
    };
    const onBlur = (e) => {
        emit('on-blur', e);
    };
    const onChange = (e) => {
        emit('on-change', e);
    };
    const onInput = (e) => {
        emit('on-input', e);
    };
    watch(() => props.modelValue, value => {
        inputVal.value = value;
    });
    watch(inputVal, value => {
        emit('update:modelValue', value);
    });
    return { inputVal, onKeypress, onFocus, onBlur, onInput, onChange };
};
const useBtns = (emit) => {
    const onClean = () => {
        emit('update:modelValue', '');
    };
    const handleBtn = () => {
        emit('on-click');
    };
    return { onClean, handleBtn };
};

var script = defineComponent({
    name: 'MeSearch',
    components: {
        MeIcon: InMeIcon
    },
    emits: ['update:modelValue', 'on-click', 'on-search', 'on-focus', 'on-blur', 'on-input', 'on-change'],
    props: {
        modelValue: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: '请搜索'
        },
        btnText: {
            type: String,
            default: ''
        },
        align: {
            type: String,
            default: 'left'
        },
        radius: {
            type: String,
            default: '4px'
        },
        background: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const { inputVal, onKeypress, onFocus, onBlur, onInput, onChange } = useSearch(props, emit);
        const { onClean, handleBtn } = useBtns(emit);
        return { inputVal, onKeypress, onFocus, onBlur, onInput, onChange, onClean, handleBtn };
    }
});

const _hoisted_1 = ["placeholder", "disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_me_icon = resolveComponent("me-icon");

  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" 搜索 "),
    createElementVNode("div", {
      class: "me-search",
      style: normalizeStyle(`border-radius:${_ctx.radius};background:${_ctx.background};color:${_ctx.color};`)
    }, [
      createVNode(_component_me_icon, {
        name: "icon-search1",
        size: "15px",
        color: "inherit"
      }),
      withDirectives(createElementVNode("input", {
        type: "search",
        class: "u-input",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.inputVal) = $event)),
        onFocus: _cache[1] || (_cache[1] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args))),
        onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
        onKeypress: _cache[3] || (_cache[3] = (...args) => (_ctx.onKeypress && _ctx.onKeypress(...args))),
        onInput: _cache[4] || (_cache[4] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
        onChange: _cache[5] || (_cache[5] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
        placeholder: _ctx.placeholder,
        style: normalizeStyle(`text-align:${_ctx.align};`),
        disabled: _ctx.disabled
      }, null, 44 /* STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1), [
        [vModelText, _ctx.inputVal]
      ]),
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          (_ctx.modelValue)
            ? (openBlock(), createBlock(_component_me_icon, {
                key: 0,
                name: "icon-close",
                size: "16px",
                color: "inherit",
                onOnClick: _ctx.onClean
              }, null, 8 /* PROPS */, ["onOnClick"]))
            : createCommentVNode("v-if", true)
        ]),
        _: 1 /* STABLE */
      }),
      (_ctx.btnText)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "u-btn",
            onClick: _cache[6] || (_cache[6] = (...args) => (_ctx.handleBtn && _ctx.handleBtn(...args)))
          }, toDisplayString(_ctx.btnText), 1 /* TEXT */))
        : createCommentVNode("v-if", true)
    ], 4 /* STYLE */)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

script.render = render;
script.__file = "packages/MeSearch/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const InMeSearch = script;

const components = [
    InMeButton,
    InMeIcon,
    InMeInput,
    InMeSearch
];
const install = (app) => {
    components.forEach(component => app.component(component.name, component));
};
var index = {
    install,
    ...components
};

export { InMeButton as MeButton, InMeIcon as MeIcon, InMeInput as MeInput, InMeSearch as MeSearch, index as default };
